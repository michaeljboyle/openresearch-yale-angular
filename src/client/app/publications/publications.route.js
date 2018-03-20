(function() {
  'use strict';

  angular
    .module('oryale.publications')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'USER_ROLES'];

  function appRun(routerHelper, USER_ROLES) {
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
            },
            data: {
              authorizedRoles: [USER_ROLES.guest, USER_ROLES.user, USER_ROLES.admin],
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
})();
