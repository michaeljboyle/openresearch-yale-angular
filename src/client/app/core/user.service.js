(function() {
  'use strict';

  angular
    .module('oryale.core')
    .constant('USER_ROLES', getRoles())
    .factory('userService', userService);

  function getRoles() {
    return {
      all: '*',
      admin: 'admin',
      user: 'user',
      guest: 'guest',
    };
  }

  userService.$inject = ['$upload', '$log', '$http', 'USER_ROLES', 'authService', '$q'];

  /* @ngInject */
  function userService($upload, $log, $http, USER_ROLES, authService, $q) {
    var user = null;

    var service = {
      createUser: createUser,
      getDefaultRole: getDefaultRole,
      getCurrentUser: getCurrentUser,
      getUser: getUser,
      login: login,
      user: user,
      unauthedAllowed: unauthedAllowed,
      userHasPermittedRole: userHasPermittedRole,
    };

    return service;

    // //////////////

    /* Creates a new user, starting with the auth account with which the user
     * data will be associated */
    function createUser(data, files) {
      $log.info('Creating user');
      return authService.createAccount(data.email, data.password)
        .then(accountCreateSuccess)
        .catch(accountCreateFail);

      function accountCreateFail(error) {
        $log.error(error.message);
        throw error;
      }

      function accountCreateSuccess(fbuser) {
        delete data.password;
        $log.info('creating user with info: ', data);
        var profile = {displayName: data.displayName};
        if (data.photoUrl) {
          profile.photoURL = data.photoUrl;
        }
        fbuser.updateProfile(profile);
        // Important: Add firebase ID to data because the firebase uid
        // will be used as the unique id for the user
        data.id = fbuser.uid;
        return $upload.upload({
          url: '/api/user',
          data: data,
          // file: files,
          method: 'POST',
          sendDataAsJson: true,
        })
          .then(userCreateSuccess)
          .catch(userCreateFail);

        function userCreateSuccess(data, status, headers, config) {
          // return user obj
          $log.info('User creation success', data.data);
          user = data.data;
          return user;
        }

        function userCreateFail(data, status, headers, config) {
          $log.info('User creation failed');
          return data.error;
        }
      }
    }


    /* Retrieves the user corresponding to the authenticated user */
    function getCurrentUser() {
      $log.info('userService.getCurrentUser');
      var deferred = $q.defer();
      if (user) {
        $log.info('user already loaded, user is ', user);
        deferred.resolve(user);
      }
      else if (authService.isAuthenticated()) {
        var firebaseUser = authService.getFirebaseUser();
        if (firebaseUser) {
          $log.info('fbuser id is ', firebaseUser.uid);
          getUser(firebaseUser.uid)
            .then(function(user) {
              deferred.resolve(user);
            })
            .catch(function(error) {
              deferred.reject(error);
            });
        }
      }
      else {
        deferred.reject('No user authenticated');
      }
      return deferred.promise;
    }


    /* Returns the default role for any visitor */
    function getDefaultRole() {
      return USER_ROLES.guest;
    }


    /* Retrieves any user by id */
    function getUser(id) {
      var deferred = $q.defer();
      $log.info('userService: getUser');
      authService.waitForToken()
        .then(function() {
          $log.info('userService: getUser sending api request with id: ', id);
          return $http.get('/api/user/' + id);
        })
        .then(getUserSuccess)
        .catch(getUserFail);
      return deferred.promise;

      function getUserSuccess(data, status, headers, config) {
        $log.info('User retrieved: ', data.data);
        user = data.data;
        deferred.resolve(user);
      }

      function getUserFail(data, status, headers, config) {
        $log.info('getUser failed with error: ', data, status);
        deferred.reject(data.error);
      }
    }


    /* Wrapper for getUser that calls authentication first, intended for
     * use on initial login with loginDialog, not subsequent getUser requests */
    function login(email, pw) {
      $log.info('userService login');
      return authService.login(email, pw)
        .then(function(firebaseUser) {
          return getUser(firebaseUser.uid);
        })
        .catch(function(error) {
          $log.error('Unable to authenticate with error: ', error);
          throw error;
        });
    }


    /* Returns true if the visitor role is among the permitted roles */
    function unauthedAllowed(permittedRoles) {
      var role = getDefaultRole();
      $log.info('permitted roles ', permittedRoles, ' and role is ', role);
      return permittedRoles.indexOf(role) != -1;
    }

    /* Returns true if the user has one of the roles in the array of roles
     * passed in */
    function userHasPermittedRole(permittedRoles) {
      var role = getDefaultRole();
      if (user) {
        role = user.role;
      }
      $log.info('permitted roles ', permittedRoles, ' and role is ', role);
      return permittedRoles.indexOf(role) != -1;
    }
  }
})();
