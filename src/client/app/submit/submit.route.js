(function() {
  'use strict';

  angular
    .module('oryale.submit')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'USER_ROLES'];

  function appRun(routerHelper, USER_ROLES) {
    routerHelper.configureStates(getStates());

    function getStates() {
      return [
        {
          state: 'submit',
          config: {
            url: '/submit',
            component: 'submitComponent',
            data: {
              authorizedRoles: [USER_ROLES.user, USER_ROLES.admin],
            },
          },
        },
      ];
    }
  }
})();
