app.controller('NewsFeedController',
    ['$scope', 'postsData', '$routeParams', '$localStorage', 'profileImage', function($scope, postsData, $routeParams, $localStorage, profileImage){

    $scope.newsfeedData = [];
    $scope.postsOwner = '';
    $scope.postsStartId = '';

    $scope.likePost = function(postId){
            // TODO
    };

    $scope.commentPost = function(postId){
            // TODO
    };

    $scope.moreComments = function(){
            // TODO
    };

    if(!$routeParams.username){
        $scope.postsOwner = $localStorage['username'];
        postsData.getNewsFeed($scope.postsStartId)
            .$promise
            .then(function(data) {
                data.forEach(function(post){
                    if(post.author.profileImageData == null){
                        post.author.profileImageData = "data:image/jpg;base64," + profileImage;
                    }

                    if(post.wallOwner.profileImageData == null){
                        post.wallOwner.profileImageData = "data:image/jpg;base64," + profileImage;
                    }

                    post.comments.forEach(function(comment){
                        if(comment.author.profileImageData == null){
                            comment.author.profileImageData = "data:image/jpg;base64," + profileImage;
                        }
                    });

                    $scope.newsfeedData.push(post);
                });
                console.log($scope.newsfeedData);
            }, function (error) {
                alertify.error('Server Error! Try Again!');
            })
    }
}]);
