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

  ReviewController.$inject = ['pubService', '$log', '$location'];

  /* @ngInject */
  function ReviewController(pubService, $log, $location) {
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
      vm.pub.numVotes--;
      vm.isDownvoted = true;
      return pubService.vote(vm.pub.id, -1)
        .then(function(data) {
          vm.pub.numVotes = data.obj.numVotes;
          $log.info('downvoted!');
        });
    }


    function submitComment() {
      return pubService.postComment(
        vm.pub.id, {'text': vm.newComment, 'author': 'anon'})
        .then(function(data) {
          vm.pub.comments.push(data.obj);
          vm.newComment = '';
        });
    }

    function upvote() {
      vm.pub.numVotes++;
      vm.isUpvoted = true;
      return pubService.vote(vm.pub.id, 1)
        .then(function(data) {
          vm.pub.numVotes = data.obj.numVotes;
          $log.info('upvoted!');
        });
    }
  }
})();
