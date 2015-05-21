app.controller('EditPostController',
    ['$scope', '$route', 'postsData', function ($scope, $route, postsData) {
    $scope.editPostData = [];

    $scope.cancelEdit = function cancelEdit() {
        $scope.editPostData.postContent = $scope.editPostOldText;
        $scope.editPostShown = false;
    };

    $scope.editPost = function(postId, text){
        postsData.editPost(postId, text)
            .$promise
            .then(function (data) {
                $scope.newsfeedData.forEach(function(post){
                    if(post.id == postId){
                        post.postContent = text;
                    }
                });
                alertify.success('Post Edited Successfully!');
                $scope.editPostShown = false;
            }, function(error){
                alertify.error('Post Edit Failed! Try again!');
            });
    }

    }]);

