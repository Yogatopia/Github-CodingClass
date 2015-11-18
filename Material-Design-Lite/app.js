/**
 * Created by Armand Lacle on 18-Nov-2015.
 */
myApp = angular.module('book', []);

myApp.controller('peopleCtrl', function ($scope) {

    $scope.saveData = function () {
        $scope.people.push(JSON.parse(JSON.stringify($scope.person)));
        localStorage.people = JSON.stringify($scope.people);
        $scope.person = {};
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