app.directive('register', function(){
    return{
        controller: 'WelcomeController',
        restrict: 'E',
        templateUrl: 'templates/public/register.html',
        replace: true
    }
});
