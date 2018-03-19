(function() {
  'use strict';

  angular
    .module('oryale.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$timeout', '$log', '$firebaseAuthService', 'authService', '$state', '$mdToast', 'loginDialogService', 'userService'];

  function ShellController($timeout, $log, $firebaseAuthService, authService, $state, $mdToast, loginDialogService, userService) {

    var vm = this;
    vm.authenticated = false;
    vm.title = 'OpenResearch@Yale';
    vm.busyMessage = 'Please wait ...';
    vm.displayName = '';
    vm.uid = '';
    vm.isBusy = true;
    vm.showSplash = true;
    vm.signin = signin;
    vm.signout = signout;
    vm.$onInit = onInit;


    function onInit() {
      $log.info('app loaded!');
//      Using a resolver on all routes or dataservice.ready in every controller
//      dataservice.ready().then(function(){
//        hideSplash();
//      });
      hideSplash();
      $firebaseAuthService.$onAuthStateChanged(authStateChange);
    }

    function authStateChange(firebaseUser) {
      if (firebaseUser) {
        vm.authenticated = true;
        vm.uid = firebaseUser.uid;
        if (firebaseUser.displayName) {
          vm.displayName = firebaseUser.displayName;
        }
        else {
          vm.displayName = firebaseUser.email;
        }
      }
      else {
        vm.displayName = '';
        vm.authenticated = false;
      }
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
        vm.showSplash = false;
      }, 1000);
    }

    function signin() {
      loginDialogService.showDialog();
    }

    function signout() {
      authService.logout()
        .then(function() {
          return $state.go('publications');
        })
        .then(function() {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Logout successful!')
              .position('top')
              .hideDelay(5000)
          );
        });
    }
  }
})();
