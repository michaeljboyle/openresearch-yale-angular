(function() {
  'use strict';

  angular
    .module('oryale', [
      /* Shared modules */
      'oryale.core',

      /* Feature areas */
      'oryale.layout',
      'oryale.user',
      'oryale.login',
      'oryale.submit',
      'oryale.publications',
      'oryale.review',
    ]);
})();
