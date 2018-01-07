(function() {
  angular
    .module('oryale')
    .config(configure);

  configure.$inject = ['$mdThemingProvider'];

  function configure($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('indigo')
      .accentPalette('pink')
      .backgroundPalette('grey');
  }
})();
