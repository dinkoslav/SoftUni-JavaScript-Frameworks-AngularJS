app.directive('friendrequest', function () {
    return {
        templateUrl: 'templates/user/friend-requests.html',
        restrict: 'A',
        controller: 'FriendRequestsController'
    }
});
