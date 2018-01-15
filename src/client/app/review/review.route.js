(function() {
  'use strict';

  angular
    .module('oryale.review')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'USER_ROLES'];

  function appRun(routerHelper, USER_ROLES) {
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
            data: {
              authorizedRoles: [
                USER_ROLES.guest, USER_ROLES.user, USER_ROLES.admin],
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
