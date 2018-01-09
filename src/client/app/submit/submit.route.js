(function() {
  'use strict';

  angular
    .module('oryale.submit')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/submit', {
        templateUrl: 'app/submit/submit.html',
        controller: 'SubmitController',
        controllerAs: 'vm',
      });
  }
})();
