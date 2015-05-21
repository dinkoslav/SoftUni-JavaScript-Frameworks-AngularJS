app.controller('FriendsSidebarController',
    ['$scope', 'friendsData', 'profileImage', '$routeParams', '$localStorage', function($scope, friendsData, profileImage, $routeParams, $localStorage){
    $scope.friendsCount = 0;
    $scope.friends = [];
    $scope.sidebarOwner = $localStorage['username'];

    if(!$routeParams.username || $routeParams.username == $scope.sidebarOwner){
        friendsData.getUserOwnFriends()
            .$promise
            .then(function (data) {
                $scope.friendsCount = data.length;
                data.forEach(function(friend){
                    if(friend.profileImageData == null){
                        friend.profileImageData = "data:image/jpg;base64," + profileImage;
                    }
                });

                $scope.friends = data.slice(0,6);
            }, function (error) {
                alertify.error(error.data.message);
            });
    }
    else{
        if($scope.wallData.isFriend){
            $scope.sidebarOwner = $routeParams.username;
            friendsData.getOtherUserFriends($scope.sidebarOwner)
                .$promise
                .then(function (data) {
                    $scope.friendsCount = data.friends.length;
                    data.friends.forEach(function(friend){
                        if(friend.profileImageData == null){
                            friend.profileImageData = "data:image/jpg;base64," + profileImage;
                        }
                    });

                    $scope.friends = data.friends.slice(0,6);
                }, function (error) {
                });
        }
        else{
            $scope.sidebarOwner = $routeParams.username;
            $scope.friendsSidebarVisible = false;
        }
    }

}]);
