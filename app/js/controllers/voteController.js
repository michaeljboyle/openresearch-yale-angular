app.controller('voteCtrl', ['$scope', '$rootScope', 'Posts',
               function($scope, $rootScope, Posts) {
  $rootScope.posts = Posts.query();

  $scope.upvote = function(post) {
    post.votes += 1;
    post.$update();
  }
}]);