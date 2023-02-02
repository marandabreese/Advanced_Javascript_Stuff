
const app = angular.module('challenges', []);

app.controller('TestCtrl', function($scope){
    //$scope.testName = "New User";
    $scope.Menu = ["Get Started", "My Profile", "Cat Pics"];
})