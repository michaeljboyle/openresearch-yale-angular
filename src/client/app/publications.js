(function() {
    'use strict';

    angular
        .module('oryale')
        .controller('PublicationsController', PublicationsController);

    PublicationsController.$inject = ['pubService'];

    /* @ngInject */
    function PublicationsController(pubService) {
        var vm = this;
        vm.pubs = [];

        activate();

        function activate() {
          vm.pubs = pubService.getPubList();
        }
    }
})();
