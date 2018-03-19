(function() {
  'use strict';

  angular
    .module('oryale.core')
    .factory('transitionService', transitionService);

  transitionService.$inject = [
      '$transitions', 'authService', '$log', '$firebaseAuthService',
      'loginDialogService', 'userService', '$q'];

  function transitionService($transitions, authService, $log,
                             $firebaseAuthService, loginDialogService,
                             userService, $q) {
    var service = {
      checkTransitionAuth: checkTransitionAuth,
    };

    return service;

    function checkTransitionAuth(trans) {
      var deferred = $q.defer();
      $log.info('Checking user auth for transition to ', trans.to().url);
      var roles = trans.to().data.authorizedRoles;
      // Before even getting a user, check to see if the visitor/guest rolw
      // is allowed
      if (userService.unauthedAllowed(roles)) {
        $log.info('Transition allowed');
        deferred.resolve();
      }
      // Otherwise must check to see if a user is signed in
      else if (authService.isAuthenticated()) {
        // if user IS authenticated, get the user and check role
        userService.getCurrentUser()
          .then(function(user) {
            var permitted = userService.userHasPermittedRole(roles);
            if (permitted) {
              $log.info('User is retrieved and is permitted to transition');
              deferred.resolve();
            }
            else {
              $log.info('User is retrieved and is NOT permitted to transition');
              deferred.reject();
            }
          })
          .catch(function() {
            $log.info('User is NOT retrieved and is NOT permitted to trans');
            deferred.reject();
          });
      }
      /* Case: User is not authenticated and does not have guest access.
       * Need user to authenticated first to determine access */
      else {
        var msg = 'You must be signed in';
        loginDialogService.showDialog(msg);
        deferred.reject();
      }
      return deferred.promise;
    }
  }
})();
