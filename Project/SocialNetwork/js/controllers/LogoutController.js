app.controller('LogoutController', ['$scope', 'userData', 'authentication', '$timeout', '$window', function($scope, userData, authentication, $timeout, $window){
    userData.logout()
        .$promise
        .then(function(){
            $timeout(function () {
                authentication.removeUser();
                $window.location.reload();
            }, 1000);
        })
}]);
