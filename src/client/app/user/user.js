(function() {
  'use strict';

  var userConfig = {
    bindings: {
      user: '<',
    },
    templateUrl: 'app/user/user.html',
    controller: UserController,
    controllerAs: 'vm',
  };

  angular
    .module('oryale.user')
    .component('userComponent', userConfig);

  UserController.$inject = ['$log', 'userService', 'moment'];

  /* @ngInject */
  function UserController($log, userService, moment) {
    var vm = this;
    vm.user;
    vm.$onInit = onInit;
    vm.memberFor = null;

    function onInit() {
      $log.info('Activated user view');
      $log.info('user is ', vm.user);
      setMemberFor();
    }

    function setMemberFor() {
      var dateJoined = vm.user.dateJoined;
      vm.memberFor = moment.duration(moment() - moment(dateJoined));
      $log.info('member for ', dateJoined);
    }
  }
})();
