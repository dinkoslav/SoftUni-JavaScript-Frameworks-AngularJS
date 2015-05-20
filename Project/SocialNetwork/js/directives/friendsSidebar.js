app.directive('friendssidebar', function(){
    return{
        controller: 'FriendsSidebarController',
        restrict: 'E',
        templateUrl: 'templates/user/friends-sidebar.html',
        replace: true
    }
});
