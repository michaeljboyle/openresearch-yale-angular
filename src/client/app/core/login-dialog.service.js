(function() {
  'use strict';

  angular
    .module('oryale.core')
    .factory('loginDialogService', loginDialogService);

  loginDialogService.$inject = ['$mdDialog', '$log'];

  /* @ngInject */
  function loginDialogService($mdDialog, $log) {
    var service ={
      showDialog: showDialog,
    };
    return service;

    // //////////////

    function showDialog(msg) {
      return $mdDialog.show({
        controller: 'LoginFormController',
        controllerAs: 'vm',
        templateUrl: 'app/login/login-dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        locals: {dialogMessage: msg},
        // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    }
  }
})();
