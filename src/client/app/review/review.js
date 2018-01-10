(function() {
  'use strict';

  angular
    .module('oryale.review')
    .controller('ReviewController', ReviewController);

  ReviewController.$inject = [
    '$routeParams', 'pubService', '$log', '$location'];

  /* @ngInject */
  function ReviewController($routeParams, pubService, $log, $location) {
    var vm = this;
    vm.docUrl = '';
    vm.downvote = downvote;
    vm.isUpvoted = false;
    vm.isDownvoted = false;
    vm.newComment = '';
    vm.pub = {};
    vm.submitComment = submitComment;
    vm.upvote = upvote;

    activate();

    // //////////////

    function activate() {
      return getPub().then(function() {
        vm.newComment = '';
        vm.pub.dateSubmitted = new Date(vm.pub.dateSubmitted);
        $log.info(vm.pub);
        $log.info('Activated review view');
      });
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

    function getPub() {
      var id = $routeParams.id;
      return pubService.getPub(id).then(function(data) {
        vm.pub = data;
        vm.docUrl = pubService.getDocUrl(vm.pub.gcsFilePath);
        return vm.pub;
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
