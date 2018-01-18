(function() {
  'use strict';

  var signupConfig = {
    templateUrl: 'app/user/signup.html',
    controller: SignupController,
    controllerAs: 'vm',
  };

  angular
    .module('oryale.user')
    .component('signupComponent', signupConfig);

  SignupController.$inject = ['authService', '$log', '$mdToast', '$state'];

  /* @ngInject */
  function SignupController(authService, $log, $mdToast, $state) {
    var vm = this;
    vm.about = '';
    vm.affiliation = '';
    vm.displayName = '';
    vm.email = '';
    vm.file;
    vm.password = '';
    vm.uploadProgress = 0;
    vm.submit = submit;
    vm.submitting = false;

    activate();

    function activate() {
      reset();
      $log.info('Activated signup view');
    }

    function reset() {
      vm.uploadProgress = 0;
      vm.submitting = false;
    }

    function submit() {
      vm.submitting = true;
      var data = {
        'about': vm.about,
        'affiliation': vm.affiliation,
        'displayName': vm.displayName,
        'email': vm.email,
        'password': vm.password,
      };
      var files = vm.file;
      authService.createAccount(data, files)
        .then(submitComplete)
        .catch(submitFail);

      function submitComplete(data) {
        reset();
        // Send this new post to pubService so it can be added to list
        // It will not likely be included in GET call to api because not in one
        // entity group. this is a workaround for that
        showToast('Account create Complete!');
        $state.go('publications');
      }

      function submitFail(data) {
        var message = 'Account create failed...';
        showToast(message);
      }

      function showToast(message) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(message)
            .position('bottom middle')
            .hideDelay(3000)
        );
      }
    }
  }
})();
