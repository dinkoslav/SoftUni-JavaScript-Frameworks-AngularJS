app.directive('newsfeed', function(){
    return{
        controller: 'NewsFeedController',
        restrict: 'E',
        templateUrl: 'templates/user/newsfeed.html',
        replace: true
    }
});

