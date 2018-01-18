(function() {
  'use strict';

  angular
    .module('oryale.core')
    .run(appRun);

  appRun.$inject = ['$transitions', 'transitionService'];

  function appRun($transitions, transitionService) {
    $transitions.onBefore({}, transitionService.checkTransitionAuth);
  }
})();
