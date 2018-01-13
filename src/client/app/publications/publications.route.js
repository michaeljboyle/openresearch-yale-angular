(function() {
  'use strict';

  angular
    .module('oryale.publications')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());

    function getStates() {
      return [
        {
          state: 'publications',
          config: {
            name: 'publications',
            url: '/',
            component: 'publicationsComponent',
            resolve: {
              pubs: loadData,
              submittedPub: getSubmittedPub,
            },
          },
        },
      ];
    }
  }

  loadData.$inject = ['pubService'];

  /* @ngInject */
  function loadData(pubService) {
    return pubService.getPubList();
  }

  getSubmittedPub.$inject = ['$stateParams'];

  /* @ngInject */
  function getSubmittedPub($stateParams) {
    console.log('gettingsubmitted pub');
    if (angular.equals($stateParams, {})) {
      return {};
    }
    var pub = {};
    for (var key in $stateParams) {
      console.log(key);
      if ($stateParams.hasOwnProperty(key)) {
        pub[key] = $stateParams[key];
      }
    }
    console.log('returning pub');
    console.log(pub);
    return pub;
  }
})();
