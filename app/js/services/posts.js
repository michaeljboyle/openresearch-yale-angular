app.factory('postService', function($rootScope, $http, $q, $log) {
  return $http.get('rest/query')
         .success(function(data, status, headers, config) {
          $rootScope.posts = data;
         });
});
