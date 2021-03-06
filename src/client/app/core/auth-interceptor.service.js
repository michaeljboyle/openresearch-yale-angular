(function() {
  'use strict';

  angular
    .module('oryale.core')
    .factory('authInterceptor', authInterceptor)
    .config(addInterceptor);

  authInterceptor.$inject = ['$injector', '$log'];

  /* @ngInject */
  function authInterceptor($injector, $log) {
    var service = {
      request: request,
    };
    return service;

    // //////////////

    function request(config) {
      return $injector.get('authService').getAuthToken()
        .then(function(token) {
          $log.info('route is ', config);
          if (token) {
            config.headers.Authorization = token;
          }
          return config;
        });
    }
  }

  addInterceptor.$inject = ['$httpProvider'];

  /* @ngInject */
  function addInterceptor($httpProvider) {
    // Add HTTP interceptor
    $httpProvider.interceptors.push('authInterceptor');
  }
})();
