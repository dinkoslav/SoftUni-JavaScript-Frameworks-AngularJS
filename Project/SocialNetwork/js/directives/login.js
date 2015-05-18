app.directive('login', function(){
    return{
        controller: 'WelcomeController',
        restrict: 'E',
        templateUrl: 'templates/public/login.html',
        replace: true
    }
});
