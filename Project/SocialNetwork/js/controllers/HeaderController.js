app.controller('HeaderController', ['$scope', 'userData', 'friendsData', '$localStorage', 'authentication', '$timeout', '$window', function($scope, userData, friendsData, $localStorage, authentication, $timeout, $window){
    $scope.user = {};
    if(localStorage['ngStorage-access_token']) {
        userData.getLoggedUserData()
            .$promise
            .then(function (data) {
                $scope.user = data;
            }, function(){
                authentication.removeUser();
                $timeout(function () {
                    $window.location.reload();
                }, 1000);
            });
        friendsData.getUserFriendRequests()
            .$promise
            .then(function (data) {
                $scope.requestsCount = data.length;
            });
    }
}]);
