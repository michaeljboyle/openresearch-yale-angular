app.controller('submitCtrl', ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
  
  $scope.submit = function() {
    var post = {
      title: $scope.title,
      description: $scope.description
    };
    $http.post('/rest/insert', post).success(function(data, status) {
      $rootScope.posts.push(data);
      $location.path('/');
    });
  };

}]);