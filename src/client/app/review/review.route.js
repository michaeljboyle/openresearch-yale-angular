(function() {
  'use strict';

  angular
    .module('oryale.review')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());

    function getStates() {
      return [
        {
          state: 'review',
          config: {
            url: '/review/{pubId}',
            component: 'reviewComponent',
            resolve: {
              pub: loadData,
            },
          },
        },
      ];
    }
  }

  loadData.$inject = ['pubService', '$transition$'];

  /* @ngInject */
  function loadData(pubService, $transition$) {
    var id = $transition$.params().pubId;
    var pub = pubService.getPub(id);
    pub.dateSubmitted = new Date(pub.dateSubmitted);
    return pub;
  }
})();
