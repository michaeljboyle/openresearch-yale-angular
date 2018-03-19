(function() {
  'use strict';

  angular
    .module('oryale.login')
    .controller('LoginFormController', LoginFormController);

  LoginFormController.$inject = [
    'userService', '$log', '$mdDialog', '$state', '$mdToast', 'dialogMessage'];

  /* @ngInject */
  function LoginFormController(userService, $log, $mdDialog, $state,
                               $mdToast, dialogMessage) {
    var vm = this;
    vm.cancel = cancel;
    vm.email = '';
    vm.error = '';
    vm.dialogMessage = dialogMessage || '';
    vm.password = '';
    vm.login = login;
    vm.$onInit = onInit;
    vm.signup = signup;

    function onInit() {
      $log.info('login page activate');
    }

    function clearMessages() {
      vm.dialogMessage = '';
      vm.error = '';
    }

    function cancel() {
      clearMessages();
      $mdDialog.cancel('Login cancelled');
    }

    function login(email, pw) {
      clearMessages();
      $log.info('login clicked');
      userService.login(email, pw)
        .then(loginSuccess)
        .catch(loginFail);

      function loginSuccess(user) {
        $log.info('login success with user: ', user);
        $mdDialog.hide('Login success!')
          .then(function() {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Logged in as ' + user.email)
                .position('top')
                .hideDelay(5000)
            );
          });
      }

      function loginFail() {
        $log.info('login failure');
        vm.error = 'Incorrect username or password';
      }
    }

    function signup() {
      clearMessages();
      $mdDialog.cancel('cancelled, signup selected');
      $state.go('signup');
    }
  }
})();
