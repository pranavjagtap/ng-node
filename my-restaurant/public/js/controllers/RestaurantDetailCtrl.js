angular.module('MyApp').controller('RestaurantDetailCtrl', ['$routeParams', '$http', '$scope', function ($routeParams, $http, $scope) {
    'use strict';
    this.params = $routeParams;
    var id = $routeParams.restaurantId;

    console.log("in restaurant Detail ctrl " + id);

    $http.get("/api/restaurants/" + id).then(function (response) {
        $scope.restaurant = response.data[0];
        console.log(response.data);
    });


    $scope.postData = function () {

        var data = {

            "address": {
                "building": "2780",
                "coord": [-73.98241999999999, 40.579505],
                "street": "Stillwell Avenue",
                "zipcode": "11224"
            },
            "borough": "Brooklyn",
            "cuisine": "American ",
            "grades": [{
                "date": "2014-06-10T00:00:00.000Z",
                "grade": "A",
                "score": 5
            }, {
                "date": "2013-06-05T00:00:00.000Z",
                "grade": "A",
                "score": 7
            }, {
                "date": "2012-04-13T00:00:00.000Z",
                "grade": "A",
                "score": 12
            }, {
                "date": "2011-10-12T00:00:00.000Z",
                "grade": "A",
                "score": 12
            }],
            "name": "SAMA",
            "restaurant_id": "22222222"
        };

        $http.post("/api/restaurants", data).then(function (response) {
            console.log(response.data);
        });

    };
    $scope.postData();
}]);
