'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'userService', NavbarController],
  controllerAs: 'navBarCtrl'
};

function NavbarController($log, $location, $rootScope, userService) {
  $log.debug('NavbarController');

  this.checkPath = function() {
    let path = $location.path();
    if(path === '/join') {
      this.hideButtons = true;
    }

    if( path !== '/join') {
      this.hideButtons = false;
      userService.getToken()
      .catch( () => {
        $location.url('/join#signup');
      });
    }
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.debug('navBarCtrl.logout');

    this.hideButtons = true;
    userService.logout()
    .then( () => {
      $location.url('/');
    });
  };

  this.routes = [
    {
      name: 'Home',
      url: '/#!/home'
    }
  ];
}
