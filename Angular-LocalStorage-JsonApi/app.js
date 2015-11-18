/**
 * Created by Armand Lacle on 18-Nov-2015.
 */
var myApp = angular.module("myApp", []);

myApp.factory("People", function ($http) {
    var peopleAPI = {};
    peopleAPI.getPeople = function () {
        return $http({
            method: "GET",
            url: "http://jsonplaceholder.typicode.com/users"
        });
    };
    return peopleAPI;
});

myApp.controller("peopleCtrl", function ($scope, People) {

    $scope.loadData = function () {
        $scope.people = [];
        if (localStorage.people !== undefined) {
            $scope.people = JSON.parse(localStorage.people);
        } else {
            People.getPeople().success(function (response) {
                $scope.people = response;
                $scope.saveData();
            });
        }
    };

    $scope.saveData = function () {
        localStorage.people = JSON.stringify($scope.people);
    };

    $scope.clearStorage = function () {
        localStorage.removeItem("people");
        $scope.loadData();
    };

    $scope.loadData();
});