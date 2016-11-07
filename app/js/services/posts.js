app.factory('Posts', ['$resource', function($resource) {
  return $resource('/api/posts/:id', { id: '@key' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

/*
app.factory('Posts', function($resource) {
  return $resource('http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });*/
  /*
  return $http.get('rest/query')
         .success(function(data, status, headers, config) {
          $rootScope.posts = data;
         });
  *//*
});*/