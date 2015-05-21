app.controller('EditCommentController',
    ['$scope', '$route', 'postsData', function ($scope, $route, postsData) {
        $scope.editCommentData = [];

        $scope.cancelEditComment = function cancelEditComment() {
            $scope.editCommentPostData.commentContent = $scope.editCommentOldText;
            $scope.editCommentShown = false;
        };

        $scope.editComment = function(commentId, text){
            postsData.editComment($scope.editCommentPostId, commentId, text)
                .$promise
                .then(function (data) {
                    $scope.editCommentPostData.comentContent = text;
                    alertify.success('Comment Edited Successfully!');
                    $scope.editCommentShown = false;
                }, function(error){
                    alertify.error('Comment Edit Failed! Try again!');
                });
        }

    }]);


