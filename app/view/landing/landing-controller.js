'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', '$rootScope', 'userService', LandingController];

function LandingController($log, $location, userService) {
  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';
};
