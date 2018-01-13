(function() {
  'use strict';

  angular
    .module('oryale', [
      /* Shared modules */
      'oryale.core',

      /* Feature areas */
      'oryale.submit',
      'oryale.publications',
      'oryale.review',
    ]);
})();
