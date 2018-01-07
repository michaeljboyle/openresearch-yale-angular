angular.module('openresearchYale').config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'voteCtrl',
    templateUrl: 'app/components/vote/voteView.html'
  }).when('/new', {
    controller: 'submitCtrl',
    templateUrl: 'app/components/submit/submitView.html'
  }).otherwise({
    redirectTo: '/'
  });
});