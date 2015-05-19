app.controller('RegisterController', ['$scope', '$window', 'userData', '$timeout', 'authentication', function($scope, $window, userData, $timeout, authentication){
    $scope.register = function(user) {
        userData.register(user)
            .$promise
            .then(function(data){
                authentication.saveUser(data);
                $timeout(function () {
                    $window.location.reload();
                }, 1000);
            })
    }
}]);