angular.module('MyApp', ['ngRoute', 'ngAnimate'])
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {

            'use strict';
            console.log("in main app");
            $routeProvider.when('/', {
                    templateUrl: 'partials/login.html',
                    controller: 'LoginCtrl'
                })
                .when('/restaurants', {
                    templateUrl: 'partials/restaurants.html',
                    controller: 'RestaurantCtrl'
                })
                .when('/restaurants/:restaurantId', {
                    templateUrl: 'partials/restaurantsDetails.html',
                    controller: 'RestaurantDetailCtrl'
                })
                .when('/restaurants/:restaurantId/edit', {
                    templateUrl: 'partials/restaurantsEdit.html',
                    controller: 'RestaurantEditCtrl'
                });

            $routeProvider.otherwise({
                redirectTo: '/'
            });

        }]);
