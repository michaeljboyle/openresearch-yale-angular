(function() {
  'use strict';

  var reviewConfig = {
    bindings: {
      pub: '<',
    },
    controller: ReviewController,
    controllerAs: 'vm',
    templateUrl: 'app/review/review.html',
  };

  angular
    .module('oryale.review')
    .component('reviewComponent', reviewConfig);

  ReviewController.$inject = ['pubService', '$log', '$location', 'authService', 'loginDialogService'];

  /* @ngInject */
  function ReviewController(pubService, $log, $location, authService, loginDialogService) {
    var vm = this;
    vm.downvote = downvote;
    vm.isUpvoted = false;
    vm.isDownvoted = false;
    vm.newComment = '';
    vm.$onInit = onInit;
    vm.pub = {};
    vm.submitComment = submitComment;
    vm.upvote = upvote;

    // //////////////

    function onInit() {
    }

    function downvote() {
      if (!authService.isAuthenticated()) {
        var msg = 'You must be signed in';
        loginDialogService.showDialog(msg);
        return;
      }
      vm.pub.numVotes--;
      vm.isDownvoted = true;
      return pubService.vote(vm.pub.id, -1)
        .then(function(data) {
          vm.pub.numVotes = data.obj.numVotes;
          $log.info('downvoted!');
        })
        .catch(function(data) {
          vm.pub.numVotes++;
          vm.isDownvoted = false;
          $log.info('downvote failed');
          alert(data.data);
        });
    }


    function submitComment() {
      if (!authService.isAuthenticated()) {
        var msg = 'You must be signed in';
        loginDialogService.showDialog(msg);
        return;
      }
      pubService.postComment(
        vm.pub.id, {'text': vm.newComment})
        .then(function(data) {
          vm.pub.comments.push(data.obj);
          vm.newComment = '';
        });
    }

    function upvote() {
      if (!authService.isAuthenticated()) {
        var msg = 'You must be signed in';
        loginDialogService.showDialog(msg);
        return;
      }
      vm.pub.numVotes++;
      vm.isUpvoted = true;
      return pubService.vote(vm.pub.id, 1)
        .then(function(data) {
          vm.pub.numVotes = data.obj.numVotes;
          $log.info('upvoted!');
        })
        .catch(function(data) {
          vm.pub.numVotes--;
          vm.isUpvoted = false;
          alert(data.data);
        });
    }
  }
})();
