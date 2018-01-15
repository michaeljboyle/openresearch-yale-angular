(function() {
  'use strict';

  angular
    .module('oryale.core')
    .constant('AUTH_EVENTS', getAuthEvents())
    .factory('authService', authService);

  function getAuthEvents() {
    return {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized',
    };
  }

  authService.$inject = ['$http', 'sessionService', '$q'];

  /* @ngInject */
  function authService($http, sessionService, $q) {
    var service = {
      isAuthenticated: isAuthenticated,
      isAuthorized: isAuthorized,
      login: login,
    };

    return service;

    // //////////////

    function isAuthenticated() {
      return !!sessionService.fetch().userId;
    }

    function isAuthorized(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (//isAuthenticated() &&
        authorizedRoles.indexOf(sessionService.fetch().userRole) !== -1);
    }

    function login(credentials) {
      console.log('login button pressed');
      var deferred = $q.defer();
      var apiReturn = {'id': 'sid', 'user': {'id': 'uid', 'role': 'admin'}};
      sessionService.create(apiReturn.id, apiReturn.user.id, apiReturn.user.role);
      deferred.resolve(apiReturn.user);
      return deferred.promise;
      // return $http.post('/api/login', credentials)
      //   .then(function(res) {
      //     sessionService.create(res.data.id, res.data.user.id,
      //                           res.data.user.role);
      //     return res.data.user;
      //   });
    }
  }
})();
