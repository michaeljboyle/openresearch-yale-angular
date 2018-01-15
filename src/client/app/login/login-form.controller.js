(function() {
  'use strict';

  angular
    .module('oryale.login')
    .controller('LoginFormController', LoginFormController);

  LoginFormController.$inject = [
    'authService', 'AUTH_EVENTS', '$log', '$mdDialog'];

  /* @ngInject */
  function LoginFormController(authService, AUTH_EVENTS, $log, $mdDialog) {
    var vm = this;
    vm.cancel = cancel;
    vm.credentials = {email: '', password: ''};
    vm.login = login;
    vm.$onInit = onInit;

    function onInit() {
      $log.info('login page activate');
      // $rootScope.$on(AUTH_EVENTS.notAuthenticated, vm.showDialog);
      // Create listener for show dialog
    }

    function cancel() {
      $mdDialog.cancel('Login cancelled');
    }

    function login(credentials) {
      $log.info('login clicked');
      authService.login(credentials)
      .then(loginSuccess)
      .catch(loginFail);

      function loginSuccess(user) {
        $log.info('login success with user id: ' + user.id);
        $mdDialog.hide('Login success!');
      }

      function loginFail() {
        $log.info('login failure');
        $mdDialog.cancel('Login failed');
        // $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      }
    }
  }
})();
