angular.module('MyApp').controller('LoginCtrl', ['$route', '$scope', '$location', '$http', '$routeParams', function ($route, $scope, $location, $http, $routeParams) {
    'use strict';
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    $scope.authenticateUser = function(user) {
      var userdata = $scope.user;
      console.log("user data : " + JSON.stringify(userdata));
      $http.post("/api/login/" + JSON.stringify(userdata)).then(function (response) {
          console.log('response : ' + JSON.stringify(response));
//          $route.reload();
          if ((userdata.email === response.data.data.name) && (userdata.password === response.data.data.password)) {
            $location.path('/restaurants');
          } else {
            console.log("invalid credentials");
          }
      });


    }

    // $http.get("/api/restaurants").then(function (response) {
    //     $scope.restaurants = response.data;
    //     console.log(response);
    // });
    //
    // $scope.deleteRestaurant = function (id) {
    //     $http.delete("/api/restaurants/" + id).then(function (response) {
    //         $scope.restaurants = response.data;
    //         console.log(response);
    //         $route.reload();
    //     });
    //
    // };
    //
    // $scope.showDetails = function (id) {
    //     $location.path('/restaurants/' + id);
    // };

}]);
