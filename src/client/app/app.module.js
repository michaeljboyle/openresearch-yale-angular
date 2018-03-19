(function() {
  'use strict';

  angular
    .module('oryale', [
      /* Shared modules */
      'oryale.core',

      /* Feature areas */
      'oryale.layout',
      'oryale.login',
      'oryale.user',
      'oryale.signup',
      'oryale.submit',
      'oryale.publications',
      'oryale.review',
    ]);
})();
