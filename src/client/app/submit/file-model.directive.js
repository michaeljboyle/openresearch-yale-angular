(function() {
  'use strict';

  angular
    .module('oryale.submit')
    .directive('fileModel', fileModel);

  fileModel.$inject = ['$parse'];

  /* @ngInject */
  function fileModel($parse) {
    var directive = {
      controller: 'SubmitController',
      link: link,
      restrict: 'A',
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(ctrl, element[0].files[0]);
        });
        ctrl.submit();
      });
    }
  }
})();
