(function() {
  'use strict';

  angular
    .module('oryale.login')
    .factory('loginDialogService', loginDialogService);

  loginDialogService.$inject = ['$mdDialog', '$firebaseAuth', '$log'];

  /* @ngInject */
  function loginDialogService($mdDialog, $firebaseAuth, $log) {
    var service ={
      showDialog: firebaseLogin,
    };
    return service;

    // //////////////

    function firebaseLogin() {
      var auth = $firebaseAuth();

      // login with Facebook
      return auth.signInWithEmailAndPassword()
        .then(loginSuccess)
        .catch(loginFail);

      function loginSuccess(firebaseUser) {
        $log.info('Signed in as: ', firebaseUser.uid);
      }

      function loginFail(error) {
        $log.info('Authentication failed:', error);
      }
    }

    function showDialog(ev) {
      return $mdDialog.show({
        controller: 'LoginFormController',
        controllerAs: 'vm',
        templateUrl: 'app/login/login-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    }
  }
})();
