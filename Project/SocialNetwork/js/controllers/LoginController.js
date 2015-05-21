app.controller('LoginController', ['$scope', 'userData', '$timeout', '$window', 'authentication', '$localStorage', 'profileImage', 'coverImage', function($scope, userData, $timeout, $window, authentication, $localStorage, profileImage, coverImage){
    $scope.login = function(user) {
        if(user == undefined){
            alertify.error('Enter something ?!?!');
        }
        else if(user.username == '' || user.username == undefined){
            alertify.error('Username cannot be empty!');
        }
        else if(user.password == undefined || user.password == '' || user.password.length < 6){
            alertify.error('Password should be at least 6 symbols!');
        }
        else{
            userData.login(user)
                .$promise
                .then(function(data){
                    alertify.success('Successfully Logged In!');
                    if(user.rememberMe){
                        authentication.rememberUser(data);
                    }
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
                });
        }
    }
}]);
