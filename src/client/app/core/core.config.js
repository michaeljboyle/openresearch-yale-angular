(function() {
  'use strict';

  angular
    .module('oryale.core')
    .config(config);

  config.$inject = [];

  /* @ngInject */
  function config() {
    var config = {
      apiKey: 'AIzaSyBeRT8q1qGs54uD9rhFCYBHPaj-p7xH-q8',
      authDomain: 'openresearch-yale.firebaseapp.com',
      projectId: 'openresearch-yale',
      storageBucket: 'openresearch-yale.appspot.com',
    };
    firebase.initializeApp(config);
  }
})();
