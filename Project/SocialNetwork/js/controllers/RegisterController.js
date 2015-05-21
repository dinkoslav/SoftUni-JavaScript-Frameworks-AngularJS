app.controller('RegisterController', ['$scope', '$window', 'userData', '$timeout', 'authentication', '$localStorage', 'profileImage', 'coverImage', function($scope, $window, userData, $timeout, authentication, $localStorage, profileImage, coverImage){
    $scope.register = function(user) {
        if(user == undefined){
            alertify.error('Enter something ?!?');
        }
        else if(user.username == undefined || user.username == ''){
            alertify.error('Username cannot be empty!');
        }
        else if(user.name == undefined || user.name == ''){
            alertify.error('Name cannot be empty!');
        }
        else if(user.password == undefined || user.password.length < 6 || user.password != user.confirmPassword){
            alertify.error('Password should be at least 6 symbols and same as confirmation password');
        }
        else if(user.email == undefined || user.email == ''){
            alertify.error('Email cannot be empty!');
        }
        else{
            userData.register(user)
                .$promise
                .then(function(data){
                    alertify.success('Successfully Registered!');
                    authentication.saveUser(data);
                    userData.getLoggedUserData()
                        .$promise
                        .then(function (data) {
                            if(data.profileImageData == null) {
                                data.profileImageData = "data:image/jpg;base64," + profileImage;
                            }

                            if(data.coverImageData == null) {
                                data.coverImageData = "data:image/jpg;base64," + coverImage;
                            }

                            var gender = 'Other';
                            if(data.gender == 1){
                                gender = 'Male';
                            }
                            else if(data.gender == 2){
                                gender = 'Female';
                            }

                            $localStorage.$default({
                                'username': data.username,
                                'profileImageData': data.profileImageData,
                                'coverImageData': data.coverImageData,
                                'name': data.name,
                                'id': data.id,
                                'email': data.email,
                                'gender': gender
                            });
                            $timeout(function () {
                                $window.location.reload();
                            }, 1000);
                        }, function(){
                            authentication.removeUser();
                            alertify.error('Server Error! Try Again!');
                        });
                }, function(){
                    authentication.removeUser();
                    alertify.error('Registration Failed! Try Again!');
                })
        }
    }
}]);