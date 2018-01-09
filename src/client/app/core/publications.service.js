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
  }
})();
