(function() {
  'use strict';

  angular
    .module('oryale.core')
    .factory('sessionService', sessionService);

  sessionService.$inject = [];

  /* @ngInject */
  function sessionService() {
    var sessionId = null;
    var userId = null;
    var userRole = null;

    var service = {
      create: create,
      fetch: fetch,
      destroy: destroy,
    };
    return service;

    // //////////////

    function create(sid, uid, urole) {
      console.log('sessionService: create ' + sid + uid + urole);
      sessionId = sid;
      userId = uid;
      userRole = urole;
    }

    function fetch() {
      console.log('sessionService: fetching ' + sessionId + userId + userRole);
      return {
        sessionId: sessionId,
        userId: userId,
        userRole: userRole,
      };
    }

    function destroy() {
      console.log('sessionService: destroy');
      sessionId = null;
      userId = null;
      userRole = null;
    }
  }
})();
