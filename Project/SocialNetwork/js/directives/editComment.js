app.directive('editcomment', function () {
    return {
        templateUrl: 'templates/user/edit-comment.html',
        restrict: 'A',
        controller: 'EditCommentController'
    }
});
