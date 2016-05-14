angular.module('MyApp').controller('RestaurantCtrl', ['$route', '$scope', '$location', '$http', '$routeParams', function ($route, $scope, $location, $http, $routeParams) {
    'use strict';
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    $http.get("/api/restaurants").then(function (response) {
        $scope.restaurants = response.data;
        console.log(response);
    });

    $scope.deleteRestaurant = function (id) {
        $http.delete("/api/restaurants/" + id).then(function (response) {
            $scope.restaurants = response.data;
            console.log(response);
            $route.reload();
        });

    };

    $scope.showDetails = function (id) {
        $location.path('/restaurants/' + id);
    };

    /*
        $scope.restaurants = $http.get("http://www.garsoncepte.com/json.php?callback=JSON_CALLBACK").then(function (response) {
            $scope.status = response.status;
            $scope.data = response.data;
            console.log($scope.status + " : status , " + $scope.data + " : data");
        }, function (response) {
            $scope.data = response.data || "Request failed";
            $scope.status = response.status;
        });*/
}]);
