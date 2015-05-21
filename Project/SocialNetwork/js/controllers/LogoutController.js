app.controller('LogoutController', ['$scope', 'userData', 'authentication', '$timeout', '$window', '$localStorage', '$sessionStorage', function($scope, userData, authentication, $timeout, $window, $localStorage, $sessionStorage){
    userData.logout()
        .$promise
        .then(function(){
            $localStorage.$reset();
            $sessionStorage.$reset();
        });
    $timeout(function () {
        $window.location.reload();
    }, 1000);
}]);
