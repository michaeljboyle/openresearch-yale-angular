app.controller('submitCtrl', ['$scope', '$rootScope', '$location', 'Posts',
               function($scope, $rootScope, $location, Posts) {
  
  $scope.post = new Posts();

  $scope.submit = function() {
    $scope.post.$save(function() {
      $location.path('/');
    });
  }
}]);