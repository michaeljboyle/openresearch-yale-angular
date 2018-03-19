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

  authService.$inject = ['$http', '$q', '$localStorage', 'moment', '$log', 'USER_ROLES', '$firebaseAuthService'];

  /* @ngInject */
  function authService($http, $q, $localStorage, moment, $log, USER_ROLES, $firebaseAuthService) {
    var service = {
      createAccount: createAccount,
      getAuthToken: getAuthToken,
      getFirebaseUser: getFirebaseUser,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      updateFirebaseProfile: updateFirebaseProfile,
      waitForToken: waitForToken,
    };

    var token = null;
    var user = null;
    // $onIdTokenChanged(authStateChange); is from the 4.8.2 API
    $firebaseAuthService.$onAuthStateChanged(authStateChange);

    return service;

    // //////////////

    function authStateChange(firebaseUser) {
      if (firebaseUser) {
        $log.info('firebaseUser is ', firebaseUser);
        user = firebaseUser;
        /* getToken for 3.3.0, getIdToken for 4.8.2. Was having network
         * connectivity bug with 4.8.2 so reverted to 3.3.0 */
        firebaseUser.getToken()
          .then(function(t) {
            token = t;
            $log.info('set token ', token.length);
          });
      }
      else {
        user = null;
        token = null;
      }
    }

    function createAccount(email, pw) {
      $log.info('Creating firebase account');
      return $firebaseAuthService.$createUserWithEmailAndPassword(email, pw)
        .then(createAccountSuccess)
        .catch(createAccountFailed);

      function createAccountSuccess(firebaseUser) {
        $log.info('Firebase account created: ', firebaseUser);
        user = firebaseUser;
        return firebaseUser;
      }

      function createAccountFailed(error) {
        $log.error('Failed to create firebase account: ', error);
        throw error;
      }
    }

    function updateFirebaseProfile(name, photoUrl) {
      if (!$firebaseAuthService.currentUser) {
        return Error('Not authenticated');
      }
      else {
        // Add user display name to firebase profile for ease of use later
        var profile = {displayName: name};
        user.displayName = name;
        if (photoUrl) {
          user.photoURL = photoUrl;
          profile.photoURL = photoUrl;
        }
        $firebaseAuthService.currentUser.updateProfile(profile);
      }
    }


    function getAuthToken() {
      var deferred = $q.defer();
      if (token) {
        $log.info('token is length: ', token.length);
        deferred.resolve(token);
      }
      else {
        if (!user) {
          $log.info('No current firebase user, token is null');
          deferred.resolve(null);
        }
        else {
          /* getToken for 3.3.0, getIdToken for 4.8.2. Was having network
           * connectivity bug with 4.8.2 so reverted to 3.3.0 */
          $log.info('user is ', user);
          $log.info('user has fn getToken ', 'getToken' in user);
          user.getToken()
            .then(function(t) {
              token = t;
              $log.info('Token fetched and set with length: ', t.length);
              deferred.resolve(t);
            })
            .catch(function(err) {
              $log.info('user.getToken failed with ', err);
              deferred.resolve(null);
            });
        }
      }
      return deferred.promise;
    }


    function getFirebaseUser() {
      return user;
    }

    function isAuthenticated() {
      if (user) {
        return true;
      }
      return false;
    }


    function login(email, pw) {
      $log.info('auth.service login');
      return $firebaseAuthService.$signInWithEmailAndPassword(email, pw)
        .then(function(fbuser) {
          $log.info('Authentication success: ', fbuser);
          user = fbuser;
          return fbuser;
        });
        // .catch(function(error) {
        //   $log.info('Authentication failed with error: ', error);
        // });
    }

    function logout() {
      $log.info('auth.service logout');
      user = null;
      token = null;
      return $firebaseAuthService.$signOut();
    }

    /* A wrapper for getAuthToken that doesn't return a token, just waits
     * for that token to return. For use when a fn doesn't need the token,
     * just needs to wait for it to be set. */
    function waitForToken() {
      $log.info('Waiting for auth token');
      var deferred = $q.defer();
      getAuthToken()
        .then(function(t) {
          deferred.resolve(t);
        });
      return deferred.promise;
    }
  }
})();
