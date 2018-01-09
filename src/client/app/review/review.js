(function() {
    'use strict';

    angular
        .module('oryale.review')
        .controller('ReviewController', ReviewController);

    ReviewController.$inject = [
        '$routeParams', 'pubService', '$log', '$location'];

    /* @ngInject */
    function ReviewController($routeParams, pubService, $log, $location) {
        var vm = this;
        vm.docUrl = '';
        vm.pub = {};

        activate();

        // //////////////

        function activate() {
          return getPub().then(function() {
            $log.info('Activated review view');
          });
        }

        function getPub() {
          var id = $routeParams.id;
          return pubService.getPub(id).then(function(data) {
            vm.pub = data;
            vm.docUrl = pubService.getDocUrl(vm.pub.gcsFilePath);
            return vm.pub;
          });
        }
    }
})();
