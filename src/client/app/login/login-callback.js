(function() {
    'use strict';

    angular
        .module('oryale.login')
        .component('loginCallback', {
            template: '<md-progress-circular md-diameter="96"></md-progress-circular>',
            controller: CallbackController,
            controllerAs: 'vm',
        });

    CallbackController.$inject = ['authService'];

    /* @ngInject */
    function CallbackController(authService) {
      var vm = this;
      vm.$onInit = onInit;

      function onInit() {
        // authService.handleAuthentication();
      }
    }
})();