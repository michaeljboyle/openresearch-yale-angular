(function() {
    'use strict';

    angular
        .module('oryale.review')
        .directive('commentCard', commentCard);

    commentCard.$inject = [];

    /* @ngInject */
    function commentCard() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: CommentController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
              comment: '=',
            },
            templateUrl: 'app/review/comment.directive.html',
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    CommentController.$inject = ['pubService', '$log'];

    function CommentController(pubService, $log) {
      var vm = this;
      vm.comment;
      vm.isDownvoted = false;
      vm.isUpvoted = false;
      vm.downvote = downvote;
      vm.newResponse = '';
      vm.submitResponse = submitResponse;
      vm.upvote = upvote;

      function downvote() {
        vm.comment.numVotes--;
        return pubService.vote(vm.comment.id, -1)
          .then(function(data) {
            vm.comment.numVotes = data.obj.numVotes;
            $log.info('downvoted!');
          });
      }

      function submitResponse() {
        return pubService.postCommentResponse(
          vm.comment.id, {'text': vm.newResponse, 'author': 'anon'})
            .then(function(data) {
              vm.comment.responses.push(data.obj);
              vm.newResponse = '';
            });
      }

      function upvote() {
        vm.comment.numVotes++;
        return pubService.vote(vm.comment.id, 1)
          .then(function(data) {
            vm.comment.numVotes = data.obj.numVotes;
            $log.info('upvoted!');
          });
      }
    }
})();
