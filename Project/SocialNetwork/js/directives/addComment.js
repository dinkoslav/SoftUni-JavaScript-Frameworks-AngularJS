app.directive('addcomment', function () {
    return {
        templateUrl: 'templates/user/add-comment.html',
        restrict: 'A',
        controller: 'AddCommentController'
    }
});
