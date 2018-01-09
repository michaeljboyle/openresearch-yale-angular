(function() {
    'use strict';

    angular
        .module('oryale')
        .factory('submitService', submitService);

    submitService.$inject = ['$http', '$log', '$upload'];

    /* @ngInject */
    function submitService($http, $log, $upload) {
        var service = {
            submit: submit,
        };
        return service;

        // //////////////

        function submit(data, files) {
          return $upload.upload({
            url: 'api/pub',
            data: data,
            file: files,
            method: 'POST',
            sendDataAsJson: true,
          });
        }
    }
})();
