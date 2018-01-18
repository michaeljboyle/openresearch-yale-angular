(function() {
  'use strict';

  angular
    .module('oryale.login')
    .run(appRun);

  appRun.$inject = [
    'loginDialogService', '$transitions',
    'authService', 'USER_ROLES', '$q', '$log'];

  function appRun(loginDialogService, $transitions,
                  authService, USER_ROLES, $q, $log) {
    // authService.handleAuthentication();
    // First give the user default permissions
    // authService.sessionCreate(null, null, null, USER_ROLES.guest);
    $transitions.onBefore({}, checkTransitionAuth);

    function checkTransitionAuth(trans) {
      var hasAccess = authService.userHasStateAccess(trans);
      if (hasAccess) {
        return;
      }
      else {
        return loginDialogService.showDialog()
          .then(loginSuccess)
          .catch(loginFail);
      }

      function loginSuccess() {
        return;
      }

      function loginFail() {
        return trans.router.stateService.target('signup');
      }
    }

    function test(trans) {
      var deferred = $q.defer();
      $log.info(trans.to().name);
      if (trans.to().name == 'submit' && !authService.isAuthenticated()) {
        authService.login(trans.to().name);
        deferred.reject();
      }
      else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function checkPermissions(trans) {
      // var deferred = $q.defer();
      $log.info('transing to ' + JSON.stringify(trans.to()));
      $log.info('login.route onStateChange: checking user authorized');
      var authorizedRoles = trans.to().data.authorizedRoles;
      $log.info('authorized roles are ' + authorizedRoles);
      if (!authService.isAuthorized(authorizedRoles)) {
        $log.info('user not authorized');
        if (authService.isAuthenticated()) {
          // user is not allowed
          $log.info('user is authenticated but not allowed');
          // deferred.reject();
          return false;
          // return trans.router.stateService.target('login');
        }
        else {
          // user is not logged in
          $log.info('user not authenticated');
          authService.login(trans.to());
        }
          // loginDialogService.loginDialog()
          // .then(function() {
          //   deferred.resolve();
          // })
          // .catch(function(msg) {
          //   deferred.reject(msg);


            // if (msg == 'signup') {
            //   deferred.resolve(trans.router.stateService.target('signup'));
            // }
            // else {
            //   deferred.reject();
            // }
          // });

          // return trans.router.stateService.target('login');
      }
      else {
        $log.info('user authorized, proceeding');
        deferred.resolve();
      }
      return; // deferred.promise;
    }
  }
})();
