app.controller('FriendsController', ['$scope', 'friendsData', '$routeParams', '$localStorage', 'profileImage', function($scope, friendsData, $routeParams, $localStorage, profileImage){
    $scope.friends = [];
    $scope.friendsCount = 0;

    if($routeParams.username == $localStorage['username']){
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
}]);
