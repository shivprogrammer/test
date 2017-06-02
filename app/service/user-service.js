'use strict';

module.exports = ['$q', '$log', '$http', '$window', userService];

function userService($q, $log, $http, $window) {
  $log.debug('userService');

  let service = {};
  let token = null;

  function setToken(_token) {
    $log.debug('userService.setToken');

    if (! _token) {
      return $q.reject(new Error('no token'));
    }

    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }

  service.getToken = function() {
    $log.debug('userService.getToken');
    if (token) {
      return $q.resolve(token);
    }

    token = $window.localStorage.getItem('token');
    if (token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  service.signup = function(user) {
    $log.debug('userService.signup');

    let url = `${__API_URL__}/api/signup`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    return $http.post(url, user, config)
    .then( res => {
      $log.log('success:', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error('failure:', err.message);
      return $q.reject(err);
    });
  };

  service.logout = function() {
    $log.debug('userService.logout');

    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };

  service.login = function(user) {
    $log.debug('userService.login');

    let url = `${__API_URL__}/api/login`;
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        userorization: `Basic ${base64}`
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
