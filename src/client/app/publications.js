(function() {
    'use strict';

    angular
        .module('oryale')
        .controller('PublicationsController', PublicationsController);

    PublicationsController.$inject = ['pubService', '$log'];

    /* @ngInject */
    function PublicationsController(pubService, $log) {
        var vm = this;
        vm.pubs = [];

        activate();

        function activate() {
            return getPubList().then(function() {
                $log.info('Activated publiations view');
            });
        }

        function getPubList() {
            return pubService.getPubList().then(function(data) {
                vm.pubs = data;
                return vm.pubs;
            });
        }
    }
})();
