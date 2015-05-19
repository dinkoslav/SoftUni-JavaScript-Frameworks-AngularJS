app.directive('login', function(){
    return{
        controller: 'LoginController',
        restrict: 'E',
        templateUrl: 'templates/public/login.html',
        replace: true
    }
});
