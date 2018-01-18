(function() {
  angular
    .module('oryale')
    .config(configure);

  configure.$inject = ['$mdThemingProvider', '$urlRouterProvider'];

  function configure($mdThemingProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/');
    $mdThemingProvider
      .theme('default')
      .primaryPalette('indigo')
      .accentPalette('pink')
      .backgroundPalette('grey');
  }
})();
