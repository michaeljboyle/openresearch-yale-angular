app.factory('Posts', ['$resource', function($resource) {
  return $resource('/api/posts/:id', { id: '@key' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);