app.factory('friendsData', ['$resource', 'baseServiceUrl', 'authentication', function($resource, baseServiceUrl, authentication){
    function getUserFriendRequests(){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'me/requests',
            null,
            {
                'get': {
                    method: 'GET',
                    isArray: true,
                    headers: headers
                }
            })
            .get();
    }

    function approveFriendRequest(requestId) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'me/requests/' + requestId + '?status=approved',
            null,
            {
                'update': {
                    method: 'PUT',
                    headers: headers
                }
            })
            .update();
    }

    function rejectFriendRequest(requestId) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'me/requests/' + requestId + '?status=rejected',
            null,
            {
                'update': {
                    method: 'PUT',
                    headers: headers
                }
            })
            .update();
    }

    return{
        getUserFriendRequests: getUserFriendRequests,
        approveFriendRequest: approveFriendRequest,
        rejectFriendRequest: rejectFriendRequest
    }
}]);

