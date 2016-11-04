app.directive('postCard', function() { 
  return { 
    restrict: 'E',
    controller: 'upvoteCtrl',
    controllerAs: 'ctrl',
    scope: {
      post: '='
    },
    templateUrl: 'js/directives/postCard.html'
  }; 
});