app.controller('upvoteCtrl', ['$scope', '$http', function($scope, $http) {

  this.upvote = function() {
    $http.post('/rest/upvote', $scope.post).success(function(data, status) {
      $scope.post = data;
    });
  };
}]);