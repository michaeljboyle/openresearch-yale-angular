(function() {
    'use strict';

    angular
        .module('oryale.review')
        .controller('ReviewController', ReviewController);

    ReviewController.$inject = ['$routeParams', 'pubService', '$log'];

    /* @ngInject */
    function ReviewController($routeParams, pubService, $log) {
        var vm = this;
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
            return vm.pub;
          });
        }
    }
})();
