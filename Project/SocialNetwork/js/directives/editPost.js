app.directive('editpost', function () {
    return {
        templateUrl: 'templates/user/edit-post.html',
        restrict: 'A',
        controller: 'EditPostController'
    }
});
