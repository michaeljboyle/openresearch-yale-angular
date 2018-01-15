(function() {
  'use strict';

  angular
    .module('oryale.core')
    .constant('USER_ROLES', getUserRoles());

  function getUserRoles() {
    return {
      all: '*',
      admin: 'admin',
      user: 'user',
      guest: 'guest',
    };
  }
})();
