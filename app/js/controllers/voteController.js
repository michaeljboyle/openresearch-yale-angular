app.controller('voteCtrl', ['$scope', '$http', '$rootScope', 'postService', function($scope, $http, $rootScope, postService) {
  postService.success(function(data) {
    $scope.posts = data;
  });
}]);
/*
  $scope.upvoter = {
    upvote: function(post) {
      console.log('here');
      console.log(post);
      $http.post('/rest/upvote', post).success(function(data, status) {
        post.votes = data.votes;
      });
    }
  };
}]);
*/