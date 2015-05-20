app.controller('FriendRequestsController',
    ['$scope', '$route', 'friendsData', function ($scope, $route, friendsData) {
        $scope.acceptRequest = acceptRequest;
        $scope.rejectRequest = rejectRequest;
        $scope.cancel = cancel;

        function cancel(requestId) {
            $scope.requestDetailsShown = false;
        }

        function acceptRequest(requestId) {
            friendsData.approveFriendRequest(requestId)
                .$promise
                .then(function (data) {
                    alertify.success('Friend Added Successfully!');
                    friendsData.getUserFriendRequests()
                        .$promise
                        .then(function (data) {
                            $scope.requestsCount = data.length;
                            $scope.requests = data;
                            if($scope.requestsCount === 0) {
                                $scope.requestDetailsShown = false;
                            }
                        });
                    $route.reload();
                }, function (error) {
                    alertify.error('Friend Adding Fail!');
                });
        }

        function rejectRequest(requestId) {
            friendsData.rejectFriendRequest(requestId)
                .$promise
                .then(function (data) {
                    alertify.success('Friend Rejected Successfully!');
                    friendsData.getUserFriendRequests()
                        .$promise
                        .then(function (data) {
                            $scope.requestsCount = data.length;
                            $scope.requests = data;
                            if($scope.requestsCount === 0) {
                                $scope.requestDetailsShown = false;
                            }
                        });
                }, function (error) {
                    alertify.error('Friend Reject Fail!');
                });
        }
    }]);
