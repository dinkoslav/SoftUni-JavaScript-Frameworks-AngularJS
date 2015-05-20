app.controller('EditProfileController', ['$scope', '$localStorage', 'userData', 'profileImage', 'coverImage', '$location', function($scope, $localStorage, userData, profileImage, coverImage, $location){
    $scope.editUser = {
        'profileImageData': $localStorage['profileImageData'],
        'coverImageData': $localStorage['coverImageData'],
        'name': $localStorage['name'],
        'email': $localStorage['email'],
        'gender': $localStorage['gender']
    };

    $scope.changeCoverImageData = function(){
        console.log($scope.editUser.coverImageData);
        $scope.editUser.coverImageData = "data:image/jpg;base64," + $scope.editUser.coverImageData.base64;
    };

    $scope.changeProfileImageData = function(){
        $scope.editUser.profileImageData = "data:image/jpg;base64," + $scope.editUser.profileImageData.base64;
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
            if(typeof user.profileImageData == "object"){
                user.profileImageData = "data:image/jpg;base64," + user.profileImageData.base64;
            }

            if(typeof user.coverImageData == "object"){
                user.coverImageData = "data:image/jpg;base64," + user.coverImageData.base64;
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
