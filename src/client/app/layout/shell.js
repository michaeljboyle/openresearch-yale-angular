(function() {
  'use strict';

  angular
    .module('oryale.layout')
    .controller('Shell', Shell);

  Shell.$inject = ['$timeout', '$log', '$firebaseAuthService'];

  function Shell($timeout, $log, $firebaseAuthService) {

    var vm = this;

    vm.title = 'OpenResearch@Yale';
    vm.busyMessage = 'Please wait ...';
    vm.displayName = '';
    vm.isBusy = true;
    vm.showSplash = true;
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
        vm.displayName = firebaseUser.email;
      }
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
        vm.showSplash = false;
      }, 1000);
    }
  }
})();
