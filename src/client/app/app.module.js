(function() {
  'use strict';

  angular
    .module('oryale', [
      /* Shared modules */
      'oryale.core',

      /* Feature areas */
      'oryale.login',
      'oryale.submit',
      'oryale.publications',
      'oryale.review',
    ]);
})();
