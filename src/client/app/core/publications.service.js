(function() {
  'use strict';

  angular
    .module('oryale')
    .factory('pubService', pubService);

  pubService.$inject = ['$http', '$log'];

  /* @ngInject */
  function pubService($http, $log) {
    var service = {
      'getPubList': getPubList,
    };

    return service;


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
  }
})();
