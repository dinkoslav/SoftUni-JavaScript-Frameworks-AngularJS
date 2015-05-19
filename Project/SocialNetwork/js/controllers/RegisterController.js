app.controller('RegisterController', ['$scope','userData', function($scope, userData){
    $scope.register = function(user) {
        userData.register(user);
    }
}]);