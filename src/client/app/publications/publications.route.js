(function() {
  'use strict';

  angular
    .module('oryale.publications')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/publications/publications.html',
        controller: 'PublicationsController',
        controllerAs: 'vm',
      });
  }
})();
