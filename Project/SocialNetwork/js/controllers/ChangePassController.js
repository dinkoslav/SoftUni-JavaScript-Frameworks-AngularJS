app.controller('ChangePassController', ['$scope', 'userData', '$location', function($scope, userData, $location){
    $scope.changePass = function(password){
        if(password.newPassword != password.confirmPassword){
            alertify.error('New password dont match confirm password');
        }
        else{
            userData.changePassword(password)
                .$promise
                .then(function (data) {
                    alertify.success('Password Changed Successfully!');
                    $location.path('/');
                }, function(error){
                    alertify.error('Password Changed Failed! Try again!');
                });
        }
    }
}]);
