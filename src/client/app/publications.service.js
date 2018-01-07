(function() {
    'use strict';

    angular
        .module('oryale')
        .factory('pubService', pubService);

    pubService.$inject = ['$http', '$resource'];

    /* @ngInject */
    function pubService($http, $resource) {
        var service = {
            'getPubList': getPubList,
        };
        return service;

        function getPubList() {
          return $http.get('/api/pubs/get_pub_list');
        }
    }
})();
