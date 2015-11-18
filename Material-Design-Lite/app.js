/**
 * Created by Armand Lacle on 18-Nov-2015.
 */
myApp = angular.module('book', []);

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

myApp.controller('peopleCtrl', function ($scope, People) {

    $scope.saveData = function () {
        $scope.people.push(JSON.parse(JSON.stringify($scope.person)));
        localStorage.people = JSON.stringify($scope.people);
        $scope.person = {};
    };

    $scope.saveAll = function () {
        localStorage.people = JSON.stringify($scope.people);
    };

    $scope.editItem = function (index) {
        //$scope.person = $scope.people[index];
        tempArr = $scope.people.splice(index, 1);
        $scope.person = tempArr[0];
    };

    $scope.loadData = function () {
        $scope.people = []; // Create empty array to hold contact objects
        if (localStorage.people !== undefined) {
            $scope.people = JSON.parse(localStorage.people);
        } else {
            People.getPeople().success(function (response) {
                $scope.people = response;
                $scope.saveAll();
            });
        }
    };

    $scope.clearStorage = function () {
        localStorage.removeItem("people");
        $scope.loadData();
    };

    $scope.removeItem = function (index) {
        $scope.people.splice(index, 1);
        localStorage.people = JSON.stringify($scope.people);
    };

    $scope.showCard = function (index) {
        document.getElementById("card" + index).classList.toggle("select-card");
        document.getElementById("card" + index).classList.toggle("mdl-shadow--6dp");
        document.getElementById("card-menu" + index).classList.toggle("select-card-menu");

    };
    $scope.loadData();
});