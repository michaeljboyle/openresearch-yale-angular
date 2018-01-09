(function() {
  'use strict';

  angular
    .module('oryale.submit')
    .controller('SubmitController', SubmitController);

  SubmitController.$inject = ['submitService', '$log', '$mdToast', '$location'];

  /* @ngInject */
  function SubmitController(submitService, $log, $mdToast, $location) {
    var vm = this;
    vm.abstract = '';
    vm.file;
    vm.uploadProgress = 0;
    vm.submit = submit;
    vm.submitting = false;
    vm.summary = '';
    vm.title = '';

    activate();

    function activate() {
      reset();
      $log.info('Activated submit view');
    }

    function reset() {
      vm.uploadProgress = 0;
      vm.submitting = false;
    }

    function submit() {
      vm.submitting = true;
      var data = {
        'abstract': vm.abstract,
        'summary': vm.summary,
        'title': vm.title,
      };
      var files = vm.file;
      submitService.submit(data, files)
        .progress(submitProgress)
        .then(submitComplete);

      function submitProgress(evt) {
        vm.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
        $log.info('progress: ' + vm.uploadProgress +
                  '% file :'+ evt.config.file.name);
      }

      function submitComplete(data) {
        reset();
        var message = 'Submission failed...';
        if (data.data.success == true) {
          message = 'Submission Complete!';
        }
        showToast(message);
        $location.path('/');
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
