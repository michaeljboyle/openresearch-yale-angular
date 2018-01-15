(function() {
  'use strict';

  angular
    .module('oryale.login')
    .factory('loginDialogService', loginDialogService);

  loginDialogService.$inject = ['$mdDialog'];

  /* @ngInject */
  function loginDialogService($mdDialog) {
    var service ={
      loginDialog: loginDialog,
    };
    return service;

    // //////////////

    function loginDialog(ev) {
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
