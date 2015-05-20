app.controller('EditProfileController', ['$scope', '$localStorage', 'userData', 'profileImage', 'coverImage', '$location', function($scope, $localStorage, userData, profileImage, coverImage, $location){
    $scope.editUser = {
        'profileImageData': $localStorage['profileImageData'],
        'coverImageData': $localStorage['coverImageData'],
        'name': $localStorage['name'],
        'email': $localStorage['email'],
        'gender': $localStorage['gender']
    };

    $scope.editProfile = function(user){
        if(user.profileImageData.filesize > 131072){
            alertify.error('Profile image size is to big!');
        }
        else if(user.coverImageData.filesize > 1048576){
            alertify.error('Cover image size is to big!');
        }
        else if(user.name == ''){
            alertify.error('Name can not be empty!');
        }
        else if(user.email == ''){
            alertify.error('Email can not be empty!');
        }
        else{
            if(typeof user.profileImageData != 'string'){
                user.profileImageData = user.profileImageData.base64;
            }

            if(typeof user.coverImageData != 'string'){
                user.coverImageData = user.coverImageData.base64;
            }

            $localStorage['profileImageData'] = user.profileImageData;
            $localStorage['coverImageData'] = user.coverImageData;
            $localStorage['name'] = user.name;
            $localStorage['email'] = user.email;
            $localStorage['gender'] = user.gender;

            userData.editProfile(user)
                .$promise
                .then(function (data) {
                    alertify.success('Profile Edited Successfully!');
                    $location.path('/');
                }, function(error){
                    alertify.error('Profile Edit Failed! Try again!');
                });
        }
    }
}]);
