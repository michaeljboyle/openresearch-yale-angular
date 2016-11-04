var app = angular.module('PainPointsApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'voteCtrl',
    templateUrl: 'views/vote.html'
  }).when('/new', {
    controller: 'submitCtrl',
    templateUrl: 'views/submit.html'
  }).otherwise({
    redirectTo: '/'
  });
});

app.factory('myHttpInterceptor', function($rootScope, $q) {
  return {
    'requestError': function(config) {
      $rootScope.status = 'HTTP REQUEST ERROR ' + config;
      return config || $q.when(config);
    },
    'responseError': function(rejection) {
      $rootScope.status = 'HTTP RESPONSE ERROR ' + rejection.status + '\n' +
                          rejection.data;
      return $q.reject(rejection);
    },
  };
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('myHttpInterceptor');
});