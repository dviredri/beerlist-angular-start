app.controller('authCtrl', function ($scope, authFactory, $state) {


    $scope.register = function () {
        authFactory.register($scope.user).then(function () {
            $state.go('home');
        }, function (err) {
            console.log(err)
            //  alert(err.data.message)
        });
    }


    $scope.login = function () {
        authFactory.login($scope.user).then(function () {
            $state.go('home');
        }, function (err) {
            console.log(err)
            alert(err.data)
        });
    }
});