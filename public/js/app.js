var app = angular.module('carList', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'carsCtrl',
            templateUrl: '/templates/home.html'
        })


        .state('car', {
            url: '/car/:id',
            controller: 'carController',
            templateUrl: '/templates/car.html',
            params: {
                carParam: null
            }
        })

        .state('register', {
            url: '/register',
            templateUrl: '/templates/register.html',
            controller: 'authCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/templates/login.html',
            controller: 'authCtrl'
        })




    $urlRouterProvider.otherwise('/home');
}]);