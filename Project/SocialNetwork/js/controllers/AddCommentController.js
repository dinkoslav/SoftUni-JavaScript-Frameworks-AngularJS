app.controller('AddCommentController',
    ['$scope', '$route', 'postsData', '$localStorage', function ($scope, $route, postsData, $localStorage) {
        $scope.addCommentPostData = [];

        $scope.cancelAddComment = function cancelAddComment() {
            $scope.addCommentShown = false;
        };

        $scope.addComment = function(postId, text){
            if($scope.addCommentPostData.author.username == $localStorage['username'] ||
                $scope.addCommentPostData.wallOwner.isFriend ||
                $scope.addCommentPostData.wallOwner.username == $localStorage['username'] ||
                $scope.addCommentPostData.author.isFriend){
                postsData.addCommentToPost(postId, text)
                    .$promise
                    .then(function (data) {
                        $scope.addCommentPostData.comments.unshift(data);
                        $scope.addCommentPostData.totalCommentsCount += 1;
                        if($scope.addCommentPostData.totalCommentsCount != $scope.addCommentPostData.comments.length){
                            $scope.addCommentPostData.comments = $scope.addCommentPostData.comments.slice(0,3);
                        }
                        alertify.success('Comment Added Successfully!');
                        $scope.addCommentShown = false;
                    }, function(error){
                        alertify.error('Comment Add Failed! Try again!');
                    });
            }
            else{
                alertify.error('You can comment only your posts or friends posts!');
                $scope.addCommentShown = false;
            }
        }
    }]);


