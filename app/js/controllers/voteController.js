app.controller('voteCtrl', ['$scope', '$http', '$rootScope', 'Posts', function($scope, $http, $rootScope, Posts) {
  $scope.posts = Posts.query();

  $scope.upvote = function(post) {
    post.votes += 1;
    post.$update();
  }
}]);