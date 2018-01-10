(function() {
  'use strict';

  angular
    .module('oryale')
    .factory('pubService', pubService);

  pubService.$inject = ['$http', '$log'];

  /* @ngInject */
  function pubService($http, $log) {
    var service = {
      'getDocUrl': getDocUrl,
      'getPubList': getPubList,
      'getPub': getPub,
      'postComment': postComment,
      'postCommentResponse': postCommentResponse,
      'vote': vote,
    };

    return service;


    function getDocUrl(gcsFilePath) {
      return '/api/doc' + gcsFilePath;
    }


    function getPubList() {
      return $http.get('/api/getPubList')
        .then(getPubListComplete)
        .catch(function(message) {
          $log.error(message);
        });

      function getPubListComplete(data, status, headers, config) {
        $log.log('Retrieved pubs. Count=' + data.data.length);
        return data.data;
      }
    }

    function getPub(id) {
      return $http.get('/api/pub/' + id)
        .then(getPubComplete)
        .catch(function(message) {
          $log.error(message);
        });

      function getPubComplete(data, status, headers, config) {
        $log.log('Retrieved pubs. ' + data.data);
        return data.data;
      }
    }

    function postComment(parentId, data) {
      return $http.post('/api/postComment/' + parentId, data)
        .then(postCommentComplete)
        .catch(function(message) {
          $log.error(message);
        });

      function postCommentComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function postCommentResponse(parentId, data) {
      return $http.post('/api/postCommentResponse/' + parentId, data)
        .then(postCommentResponseComplete)
        .catch(function(message) {
          $log.error(message);
        });

      function postCommentResponseComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function vote(id, n) {
      return $http.post('/api/vote/' + id, {'n': n})
        .then(voteComplete)
        .catch(function(message) {
          $log.error(message);
        });

      function voteComplete(data, status, headers, config) {
        return data.data;
      }
    }
  }
})();
