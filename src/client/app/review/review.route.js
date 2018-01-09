(function() {
  'use strict';

  angular
    .module('oryale.review')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/review/:id', {
        templateUrl: 'app/review/review.html',
        controller: 'ReviewController',
        controllerAs: 'vm',
      });
  }
})();
