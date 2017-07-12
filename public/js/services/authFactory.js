app.factory('authFactory', function ($http) {
  var auth = {};
  auth.currentUser = {};

  auth.register = function (user) {
    return $http.post('/user/register', user).then(function(response){
        auth.currentUser.username = response.data.username
    })
  };

  auth.login = function (user) {
    return $http.post('/user/login', user).then(function(response){
      auth.currentUser.username = response.data.username
    })
  };

  auth.getUsername = function(user){
    return $http.get('user/currentUser').then(function(response){
      auth.currentUser.username = response.data.username
    })
  }

  auth.logout = function(user){
    return $http.get('user/logout').then(function(response){
      auth.currentUser.username = null;
    })
  }

  return auth;
});