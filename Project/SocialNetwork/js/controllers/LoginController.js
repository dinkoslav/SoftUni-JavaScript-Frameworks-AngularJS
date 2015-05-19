app.controller('LoginController', ['$scope', 'userData', '$timeout', '$window', 'authentication', function($scope, userData, $timeout, $window, authentication){
    $scope.login = function(user) {
        userData.login(user)
            .$promise
            .then(function(data){
                authentication.saveUser(data);
                $timeout(function () {
                    $window.location.reload();
                }, 1000);
            });
    }
}]);
