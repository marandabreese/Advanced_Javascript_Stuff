angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password).then(function(success) {
            if (success) {
                mvNotifier.notify("You have successfully logged in!");
            } else {
                mvNotifier.notify("That user doesn't exist");
            }
        });
    }

    $scope.signout = function() {
        mvAuth.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('Successfully logged out');
            $location.path('/');
        })
    }
})