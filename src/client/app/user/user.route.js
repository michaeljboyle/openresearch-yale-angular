(function() {
  'use strict';

  angular
    .module('oryale.user')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'USER_ROLES'];

  function appRun(routerHelper, USER_ROLES) {
    routerHelper.configureStates(getStates());

    function getStates() {
      return [
        {
          state: 'signup',
          config: {
            url: '/signup',
            component: 'signupComponent',
            data: {
              authorizedRoles: [
                  USER_ROLES.guest, USER_ROLES.user, USER_ROLES.admin],
            },
          },
        },
      ];
    }
  }
})();
