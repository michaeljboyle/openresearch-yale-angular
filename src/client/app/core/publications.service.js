(function() {
  'use strict';

  angular
    .module('oryale.core')
    .factory('pubService', pubService);

  pubService.$inject = ['$http', '$log', '$upload', '$q'];

  /* @ngInject */
  function pubService($http, $log, $upload, $q) {
    var submittedPub = false;

    var service = {
      'addSubmittedPub': addSubmittedPub,
      'getDocUrl': getDocUrl,
      'getPubList': getPubList,
      'getPub': getPub,
      'postComment': postComment,
      'postCommentResponse': postCommentResponse,
      'submit': submit,
      'submittedPub': submittedPub,
      'vote': vote,
    };

    return service;

    function addSubmittedPub(pub) {
      var deferred = $q.defer();
      submittedPub = pub;
      deferred.resolve();
      return deferred.promise;
    }

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
        if (submittedPub != false) {
          // Add the just submitted pub
          data.data.push(submittedPub);
          submittedPub = false;
        }
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

    function submit(data, files) {
      return $upload.upload({
        url: 'api/pub',
        data: data,
        file: files,
        method: 'POST',
        sendDataAsJson: true,
      });
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
