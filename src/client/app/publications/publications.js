(function() {
  'use strict';

  var publicationsConfig = {
    bindings: {
      pubs: '<',
      submittedPub: '<',
    },
    controller: PublicationsController,
    controllerAs: 'vm',
    templateUrl: 'app/publications/publications.html',
  };

  angular
    .module('oryale.publications')
    .component('publicationsComponent', publicationsConfig);

  PublicationsController.$inject = ['pubService', '$log'];

  /* @ngInject */
  function PublicationsController(pubService, $log) {
    var vm = this;
    vm.pubs = [];
  }
})();
