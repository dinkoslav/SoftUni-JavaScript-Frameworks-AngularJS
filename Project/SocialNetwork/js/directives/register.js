app.directive('register', function(){
    return{
        controller: 'RegisterController',
        restrict: 'E',
        templateUrl: 'templates/public/register.html',
        replace: true
    }
});
