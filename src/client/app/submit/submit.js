(function() {
  'use strict';

  var submitConfig = {
    templateUrl: 'app/submit/submit.html',
    controller: SubmitController,
    controllerAs: 'vm',
  };

  angular
    .module('oryale.submit')
    .component('submitComponent', submitConfig);

  SubmitController.$inject = ['pubService', '$log', '$mdToast', '$state'];

  /* @ngInject */
  function SubmitController(pubService, $log, $mdToast, $state) {
    var vm = this;
    vm.abstract = '';
    vm.authors = '';
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
      var authors = vm.authors.split(',');
      var data = {
        'abstract': vm.abstract,
        'authors': authors,
        'summary': vm.summary,
        'title': vm.title,
      };
      var files = vm.file;
      pubService.submit(data, files)
        .progress(submitProgress)
        .then(submitComplete);

      function submitProgress(evt) {
        vm.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
        $log.info('progress: ' + vm.uploadProgress + '%');
      }

      function submitComplete(data) {
        reset();
        // Send this new post to pubService so it can be added to list
        // It will not likely be included in GET call to api because not in one
        // entity group. this is a workaround for that
        var message = 'Submission failed...';
        if (data.data.success == true) {
          message = 'Submission Complete!';
          pubService.addSubmittedPub(data.data.obj)
            .then(function() {
              showToast(message);
              $state.go('publications');
            });
        }
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
