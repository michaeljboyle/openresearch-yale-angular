var app = angular.module('PainPointsApp', ['ngRoute', 'ngResource']);

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