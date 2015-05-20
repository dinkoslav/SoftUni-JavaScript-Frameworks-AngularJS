app.controller('FriendsSidebarController', ['$scope', 'friendsData', 'profileImage',  '$routeParams',function($scope, friendsData, profileImage, $routeParams){
    $scope.friendsCount = 0;
    $scope.friends = [];

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
}]);
