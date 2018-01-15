(function() {
  'use strict';

  angular
    .module('oryale.login')
    .run(appRun);

  appRun.$inject = [
    'loginDialogService', '$transitions',
    'authService', 'sessionService', 'USER_ROLES', '$q', '$log'];

  function appRun(loginDialogService, $transitions,
                  authService, sessionService,
                  USER_ROLES, $q, $log) {
    // First give the user default permissions
    sessionService.create(null, null, USER_ROLES.guest);
    $transitions.onBefore({}, checkPermissions);

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
          return false;
          // return trans.router.stateService.target('login');
        }
        else {
          // user is not logged in
          $log.info('user not authenticated');
          return loginDialogService.loginDialog();
          // return trans.router.stateService.target('login');
        }
      }
      $log.info('user authorized, proceeding');
    }
  }
})();
