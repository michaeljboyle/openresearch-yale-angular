(function() {
  'use strict';

  angular
    .module('oryale.login')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'USER_ROLES'];

  function appRun(routerHelper, USER_ROLES) {
    routerHelper.configureStates(getStates());

    function getStates() {
      return [
        {
          state: 'authenticated',
          config: {
            url: '/authenticated',
            component: 'loginCallback',
            data: {
              authorizedRoles: [USER_ROLES.guest, USER_ROLES.user, USER_ROLES.admin],
            },
          },
        },
      ];
    }
  }
})();
