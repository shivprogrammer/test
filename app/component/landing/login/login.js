'use strict';

require('./_login.scss');

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'userService', LoginController],
  controllerAs: 'loginCtrl'
};

function LoginController($log, $location, userService) {
  $log.debug('LoginController');

  userService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.login = function() {
    $log.debug('loginCtrl.login');

    userService.login(this.user)
    .then( () => {
      $location.url('/home');
    });
  };
}
