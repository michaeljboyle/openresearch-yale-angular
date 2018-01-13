(function() {
  'use strict';

  angular
    .module('oryale.submit')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());

    function getStates() {
      return [
        {
          state: 'submit',
          config: {
            url: '/submit',
            component: 'submitComponent',
          },
        },
      ];
    }
  }
})();
