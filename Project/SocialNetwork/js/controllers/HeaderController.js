app.controller('HeaderController', ['$scope', 'userData', 'friendsData', '$localStorage', 'authentication', '$timeout', '$window', '$location', 'profileImage', 'coverImage', function($scope, userData, friendsData, $localStorage, authentication, $timeout, $window, $location, profileImage, coverImage){
    $scope.user = {};
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.friendRequests = [];
    $scope.showRequestsDetail = showRequestsDetail;
    $scope.requestDetailsShown = false;
    $scope.requestsCount = 0;
    $scope.searchResultsCount = 0;
    $scope.searchResults = [];
    $scope.searchShown = false;

    if($localStorage['access_token']) {
        if(!$localStorage['username']) {
            userData.getLoggedUserData()
                .$promise
                .then(function (data) {
                    if(data.profileImageData == null) {
                        data.profileImageData = profileImage;
                    }

                    if(data.coverImageData == null) {
                        data.coverImageData = coverImage;
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
                }, function(){
                    authentication.removeUser();
                    $timeout(function () {
                        $window.location.reload();
                    }, 1000);
                });
        }

        $scope.user = {
            'username': $localStorage['username'],
            'profileImageData': $localStorage['profileImageData'],
            'coverImageData': $localStorage['coverImageData'],
            'name': $localStorage['name'],
            'id': $localStorage['id'],
            'email': $localStorage['email'],
            'gender': $localStorage['gender']
        };

        friendsData.getUserFriendRequests()
            .$promise
            .then(function (data) {
                $scope.requestsCount = data.length;
                data.forEach(function(userData){
                    if(userData.user.profileImageData == null){
                        userData.user.profileImageData = profileImage;
                    }
                });

                $scope.friendRequests = data;
            }, function(){
                authentication.removeUser();
                $timeout(function () {
                    $window.location.reload();
                }, 1000);
            });

        function showRequestsDetail() {
            if($scope.requestsCount) {
                $scope.requestDetailsShown = true;
            }
        }

        $scope.searchUsers = function(searchUser){
            if(searchUser == ''){
                $scope.searchShown = false;
            }
            else{
                friendsData.searchUsersByName(searchUser)
                    .$promise
                    .then(function (data) {
                        if(data.length){
                            data.forEach(function(result){
                                if(result.profileImageData == null){
                                    result.profileImageData = "data:image/jpg;base64," + profileImage;
                                }
                            });
                            $scope.searchResultsCount = data.length;
                            $scope.searchResults = data;
                            $scope.searchShown = true;
                        }
                        else{
                            $scope.searchResultsCount = 0;
                            $scope.searchResults = [];
                            $scope.searchShown = false;
                        }
                    }, function(){
                        $scope.searchShown = false;
                    });
            }
        }
    }
}]);
