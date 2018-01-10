(function() {
    'use strict';

    angular
        .module('oryale.review')
        .directive('commentResponse', commentResponse);

    commentResponse.$inject = [];

    /* @ngInject */
    function commentResponse() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: ResponseController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
              response: '=',
            },
            templateUrl: 'app/review/comment-response.directive.html',
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    ResponseController.$inject = ['pubService', '$log'];

    function ResponseController(pubService, $log) {
      var vm = this;
      vm.helpful = helpful;
      vm.isHelpful = false;
      vm.response;

      activate();

      function activate() {
        if (vm.response.numVotes == 0) {
          vm.response.numVotes = '';
        }
        vm.response.date = new Date(vm.response.date);
      }

      function helpful() {
        if (vm.response.numVotes == '') {
          vm.response.numVotes = 0;
        }
        vm.response.numVotes++;
        return pubService.vote(vm.response.id, +1)
          .then(function(data) {
            console.log(data);
            vm.response.numVotes = data.obj.numVotes;
            $log.info('marked helpful!');
          });
      }
    }
})();
