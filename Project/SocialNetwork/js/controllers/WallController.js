app.controller('WallController',
    ['$scope', '$routeParams', '$localStorage', 'profileImage', 'friendsData', 'postsData','coverImage', '$route', '$location', function($scope, $routeParams, $localStorage, profileImage, friendsData, postsData, coverImage, $route, $location){
    $scope.friendsSidebarVisible = true;
    $scope.wallOwner = '';
    $scope.wallData = {};
    $scope.userStatus = '';
    $scope.isButton = true;
    $scope.isMe = true;

    $scope.addPostComment = function(text){
        if(text == ''){
            alertify.error('Cannot post empty text!');
        }
        else{
            postsData.addNewPost(text, $scope.wallOwner)
                .$promise
                .then(function (data) {
                    alertify.success('Post Send Successfully!');
                    $scope.newsfeedData.unshift(data);
                }, function (error) {
                    alertify.error('Post Send Failed! Try Again!');
                });
        }
    };

    $scope.sendFriendRequest = function(username){
        friendsData.sendFriendRequest(username)
            .$promise
            .then(function (data) {
                $scope.wallData.hasPendingRequest = true;
                $scope.userStatus = 'Pending';
                alertify.success('Friend Invite Send Successfully!');
            }, function(error){
                alertify.error('Friend Invite Failed! Try again!');
            })
    };

    friendsData.getUserFullData($routeParams.username)
        .$promise
        .then(function(data) {
            if(data.username == $localStorage['username']){
                $scope.friendsSidebarVisible = true;
                $scope.userStatus = 'Me';
                $scope.isButton = false;
                $scope.isMe = true;
            }
            else if(data.isFriend){
                $scope.friendsSidebarVisible = true;
                $scope.userStatus = 'Friend';
                $scope.isButton = false;
                $scope.isMe = false;
            }
            else{
                $scope.friendsSidebarVisible = false;
                if(data.hasPendingRequest){
                    $scope.userStatus = 'Pending';
                    $scope.isButton = false;
                }
                else{
                    $scope.userStatus = 'Invite';
                    $scope.isButton = true;
                }
                $scope.isMe = false;
            }

            if(data.profileImageData == null){
                data.profileImageData = "data:image/jpg;base64," + profileImage;
            }

            if(data.coverImageData == null){
                data.coverImageData = "data:image/jpg;base64," + coverImage;
            }

            $scope.wallOwner = data.username;
            $scope.wallData = data;
        }, function (error) {
            alertify.error(error.data.message);
            $scope.friendsSidebarVisible = false;
        });
}]);
