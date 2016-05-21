angular.module('MyApp').controller('RestaurantEditCtrl', ['$routeParams',
    function ($routeParams) {
        'use strict';
        this.params = $routeParams;
        console.log("in edit edit controller");
    }]
  );
