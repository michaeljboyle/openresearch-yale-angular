app.directive('postCard', function() { 
  return { 
    restrict: 'E',
    scope: {
      post: '=',
      upvote: '&'
    },
    templateUrl: 'app/shared/post/postView.html'
  }; 
});