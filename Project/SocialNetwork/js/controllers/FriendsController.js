app.controller('FriendsController',
    ['$scope', 'friendsData', '$routeParams', '$localStorage', 'profileImage', '$location', function($scope, friendsData, $routeParams, $localStorage, profileImage, $location){
    $scope.friends = [];
    $scope.friendsCount = 0;
    $scope.friendsWallOwner = '';

    if(!$routeParams.username || $routeParams.username == $localStorage['username']){
        $scope.friendsWallOwner = $localStorage['name'];
        friendsData.getUserOwnFriends()
            .$promise
            .then(function (data) {
                $scope.friendsCount = data.length;
                data.forEach(function(friend){
                    if(friend.profileImageData == null){
                        friend.profileImageData = "data:image/jpg;base64," + profileImage;
                    }
                });

                $scope.friends = data;
            });
    }
    else{
        friendsData.getUserFullData($routeParams.username)
            .$promise
            .then(function(data) {
                if(data.isFriend){
                    $scope.friendsWallOwner = data.name;
                    friendsData.getOtherUserAllFriends($routeParams.username)
                        .$promise
                        .then(function (data) {
                            $scope.friendsCount = data.length;
                            data.forEach(function(friend){
                                if(friend.profileImageData == null){
                                    friend.profileImageData = "data:image/jpg;base64," + profileImage;
                                }
                            });

                            $scope.friends = data;
                        }, function (error) {
                            alertify.error('Server Error! Try Again!');
                            $location.path('/');
                        });
                }
                else{
                    alertify.error('You cannot access non-friend friends!');
                    $location.path('/');
                }
            }, function(error){
                alertify.error('Server Error! Try Again!');
                $location.path('/');
        })
    }
}]);
