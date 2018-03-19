(function() {
  'use strict';

  angular
    .module('oryale.user')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'USER_ROLES'];

  /* @ngInject */
  function appRun(routerHelper, USER_ROLES) {
    routerHelper.configureStates(getStates());

    function getStates() {
      return [
        {
          state: 'user',
          config: {
            url: '/user/{userId}',
            component: 'userComponent',
            data: {
              authorizedRoles: [USER_ROLES.user, USER_ROLES.admin],
            },
            resolve: {
              user: loadUser,
            },
          },
        },
      ];
    }
  }

  loadUser.$inject = ['userService', '$log', '$transition$'];

  function loadUser(userService, $log, $transition$) {
    var id = $transition$.params().userId;
    return userService.getUser(id)
      .then(loadUserSuccess)
      .catch(loadUserFail);

    function loadUserSuccess(user) {
      $log.info('xxxx is ', user);
      return user;
    }

    function loadUserFail(error) {
      throw error;
    }
  }
})();
