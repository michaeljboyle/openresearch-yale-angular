app.directive('postCard', function() { 
  return { 
    restrict: 'E',
    scope: {
      post: '=',
      upvote: '&'
    },
    templateUrl: 'js/directives/postCard.html'
  }; 
});