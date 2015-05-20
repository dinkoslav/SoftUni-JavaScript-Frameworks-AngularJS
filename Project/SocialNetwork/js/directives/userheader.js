app.directive('userheader', function(){
    return{
        controller: 'HeaderController',
        restrict: 'E',
        templateUrl: 'templates/user/header.html',
        replace: true
    }
});

