app.controller('masterCtrl', function ($scope, authFactory, $state, $rootScope) {

    $rootScope.currentUser = authFactory.currentUser

    authFactory.getUsername();

    $scope.logout = function () {
        authFactory.logout().then(function () {
                $state.go('home');
            },
            function (err) {
                alert(err);
            }
        )
    }

});