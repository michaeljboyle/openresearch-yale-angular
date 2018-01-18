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

  authService.$inject = ['$http', '$q', '$localStorage', 'moment', '$log', 'USER_ROLES', '$firebaseAuthService', 'userService'];

  /* @ngInject */
  function authService($http, $q, $localStorage, moment, $log, USER_ROLES, $firebaseAuthService, userService) {
    var service = {
      createAccount: createAccount,
      getAuthToken: getAuthToken,
      isAuthenticated: isAuthenticated,
      isAuthorized: isAuthorized,
      // login: login,
      sessionCreate: sessionCreate,
      sessionFetch: sessionFetch,
      sessionDestroy: sessionDestroy,
      sessionExpiration: sessionExpiration,
      // setFirebaseUser: setFirebaseUser,
      userHasStateAccess: userHasStateAccess,
    };

    var storageKey = 'session';
    var authenticated = false;
    var token = null;
    var creatingNewAccount = false;
    $firebaseAuthService.$onAuthStateChanged(authStateChange);

    return service;

    // //////////////

    function authStateChange(firebaseUser) {
      if (firebaseUser) {
        $log.info('firebaseUser is ', firebaseUser);
        authenticated = true;
        firebaseUser.getIdToken()
          .then(function(t) {
            token = t;
            $log.info('set token ', token.length);
            if (!creatingNewAccount) {
              userService.setUser(firebaseUser.email);
            }
          });
      }
      else {
        authenticated = false;
        token = null;
        userService.clearUser();
      }
    }

    function createAccount(data, files) {
      creatingNewAccount = true;
      var email = data.email;
      var pw = data.password;
      // immediately remove password from the data object
      delete data.password;
      return $firebaseAuthService.$createUserWithEmailAndPassword(email, pw)
        .then(createAccountSuccess)
        .catch(createAccountFailed);

      function createAccountSuccess(firebaseUser) {
        $log.info('Firebase account created: ', firebaseUser);
        // Before we can create the new user, we have
        // to wait to set the token
        firebaseUser.getIdToken()
          .then(function(t) {
            token = t;
            return;
          })
          .then(function() {
            return userService.createUser(data, files);
          })
          .then(function() {
            creatingNewAccount = false;
          });
      }

      function createAccountFailed(error) {
        $log.error('Failed to create firebase account: ', error);
      }
    }

    function getAuthToken() {
      $log.info('sending token ', token);
      return token;
    }

    function isAuthenticated() {
      try {
        return moment().isBefore(sessionExpiration());
      }
      catch (e) {
        // no session is logged
        return false;
      }
    }

    function isAuthorized(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authorizedRoles.indexOf(sessionFetch().userRole) !== -1);
    }

    // function login(credentials) {
    //   $log.info('auth.service login');
    //   return $http.post('/api/account/login', credentials)
    //     .then(function(res) {
    //       $log.info(res.data);
    //       var auth = res.data.auth;
    //       var user = res.data.user;
    //       // store username and token in local storage to keep user logged in between page refreshes
    //       sessionCreate(auth.token, auth.expiresIn, user.email, user.role);
    //       // add jwt token to auth header for all requests made by the $http service
    //       $http.defaults.headers.common.Authorization = 'Bearer ' + auth.token;
    //       return user;
    //     });
    // }

    function sessionCreate(token, expiresIn, email, role) {
      $log.info('session: create');
      var sessionData = {
        token: token,
        expiration: moment().add(expiresIn, 'second'),
        userEmail: email,
        userRole: role,
      };
      $localStorage[storageKey] = sessionData;
    }

    function sessionFetch() {
      $log.info('session: fetching');
      return $localStorage[storageKey];
    }

    function sessionDestroy() {
      $log.info('session: destroy');
      delete $localStorage[storageKey];
    }

    function sessionExpiration() {
        var expiration = sessionFetch().expiration;
        var expiresAt = angular.fromJson(expiration);
        return moment(expiresAt);
    }

    function userHasStateAccess(authorizedRoles) {
      var role = userService.getDefaultRole();
      var user = userService.getUser();
      $log.info($firebaseAuthService.currentUser);
      $log.info(userService.getUser());
      $log.info('authorized roles are', authorizedRoles);
      if ($firebaseAuthService.currentUser && user) {
        role = user.role;
      }
      $log.info(role);
      if (authorizedRoles.indexOf(role) != -1) {
        return true;
      }
      else {
        return false;
      }
    }
  }
})();
