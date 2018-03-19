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
    CommentController.$inject = ['pubService', '$log', 'authService', 'loginDialogService'];

    function CommentController(pubService, $log, authService, loginDialogService) {
      var vm = this;
      vm.comment;
      vm.isDownvoted = false;
      vm.isUpvoted = false;
      vm.downvote = downvote;
      vm.newResponse = '';
      vm.submitResponse = submitResponse;
      vm.upvote = upvote;

      activate();

      function activate() {
        vm.newResponse = '';
        vm.comment.date = new Date(vm.comment.date);
      }

      function downvote() {
        if (!authService.isAuthenticated()) {
          var msg = 'You must be signed in';
          loginDialogService.showDialog(msg);
          return;
        }
        vm.comment.numVotes--;
        vm.isDownvoted = true;
        return pubService.vote(vm.comment.id, -1)
          .then(function(data) {
            vm.comment.numVotes = data.obj.numVotes;
            $log.info('downvoted!');
          })
          .catch(function(data) {
            vm.comment.numVotes++;
            vm.isDownvoted = false;
            $log.info('downvote failed');
            alert(data.data);
          });
      }

      function submitResponse() {
        if (!authService.isAuthenticated()) {
          var msg = 'You must be signed in';
          loginDialogService.showDialog(msg);
          return;
        }
        return pubService.postCommentResponse(
          vm.comment.id, {'text': vm.newResponse})
            .then(function(data) {
              vm.comment.responses.push(data.obj);
              activate();
            });
      }

      function upvote() {
        if (!authService.isAuthenticated()) {
          var msg = 'You must be signed in';
          loginDialogService.showDialog(msg);
          return;
        }
        vm.comment.numVotes++;
        vm.isUpvoted = true;
        return pubService.vote(vm.comment.id, 1)
          .then(function(data) {
            vm.comment.numVotes = data.obj.numVotes;
            $log.info('upvoted!');
          })
          .catch(function(data) {
            vm.comment.numVotes--;
            vm.isUpvoted = false;
            alert(data.data);
          });
      }
    }
})();
