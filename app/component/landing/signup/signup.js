'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'userService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, userService) {
  $log.debug('SignupController');

  userService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    userService.signup(user)
    .then( () => {
      $location.url('/home')
    });
  };
}
