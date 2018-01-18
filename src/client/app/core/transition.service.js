(function() {
  'use strict';

  angular
    .module('oryale.core')
    .factory('transitionService', transitionService);

  transitionService.$inject = ['$transitions',
    'authService', '$log', '$firebaseAuthService'];

  function transitionService($transitions, authService, $log, $firebaseAuthService) {
    var service = {
      checkTransitionAuth: checkTransitionAuth,
    };

    return service;

    function checkTransitionAuth(trans) {
      $log.info('Checking user auth for transition');
      var roles = trans.to().data.authorizedRoles;
      var hasAccess = authService.userHasStateAccess(roles);
      if (hasAccess) {
        $log.info('Transition auth ok, transitioning');
        return;
      }
      else {
        $log.info('Transition auth not ok, transitioning');
        return $firebaseAuthService.$requireSignIn()
          .then(loginSuccess)
          .catch(loginFail);
      }

      function loginSuccess() {
        // Continue to planned route
        return;
      }

      function loginFail() {
        // Redirecto to sign up
        return trans.router.stateService.target('signup');
      }
    }
  }
})();
