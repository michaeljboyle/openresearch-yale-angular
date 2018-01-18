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

  userService.$inject = ['$upload', '$log', '$http', 'USER_ROLES'];

  /* @ngInject */
  function userService($upload, $log, $http, USER_ROLES) {
    var service = {
      clearUser: clearUser,
      createUser: createUser,
      getDefaultRole: getDefaultRole,
      getUser: getUser,
      setUser: setUser,
    };

    var user = null;

    return service;

    // //////////////

    function clearUser() {
      user = null;
    }

    function createUser(data, files) {
      $log.info('creating user with info: ', data);
      return $upload.upload({
        url: '/api/user',
        data: data,
        // file: files,
        method: 'POST',
        sendDataAsJson: true,
      })
        .then(success)
        .catch(fail);

      function success(data, status, headers, config) {
        // return user obj
        $log.info('User creation success');
        $log.info(data);
        var user = data.data;
        return user;
      }

      function fail(data, status, headers, config) {
        $log.info('User creation failed');
        return;
      }
    }

    function getDefaultRole() {
      return USER_ROLES.guest;
    }

    function getUser() {
      return user;
    }

    function setUser(email) {
      $log.info('userService: setting user with email: ', email);
      if (email !== null) {
        return $http.get('/api/user/' + email)
          .then(success)
          .catch(fail);
      }
      else {
        clearUser();
      }

      function success(data, status, headers, config) {
        // return use obj
        $log.info('getUser success');
        $log.info(data);
        user = data.data;
        return user;
      }

      function fail(data, status, headers, config) {
        $log.info('getUser fail');
        return null;
      }
    }
  }
})();
