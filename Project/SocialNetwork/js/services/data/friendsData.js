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

    function getUserOwnFriends() {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'me/friends',
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

    function getOtherUserFriends(username) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'users/' + username + '/friends/preview',
            null,
            {
                'get': {
                    method: 'GET',
                    headers: headers
                }
            })
            .get();
    }

    function getOtherUserAllFriends(username) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'users/' + username + '/friends',
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

    function searchUsersByName(username) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'users/search?searchTerm=' + username,
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

    function getUserFullData(username) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'users/' + username,
            null,
            {
                'get': {
                    method: 'GET',
                    headers: headers
                }
            })
            .get();
    }

    function sendFriendRequest(username){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'me/requests/' + username,
            null,
            {
                'save': {
                    method: 'POST',
                    headers: headers
                }
            })
            .save();
    }

    return{
        getUserFriendRequests: getUserFriendRequests,
        approveFriendRequest: approveFriendRequest,
        rejectFriendRequest: rejectFriendRequest,
        getUserOwnFriends: getUserOwnFriends,
        getOtherUserFriends: getOtherUserFriends,
        searchUsersByName: searchUsersByName,
        getUserFullData: getUserFullData,
        sendFriendRequest: sendFriendRequest,
        getOtherUserAllFriends: getOtherUserAllFriends
    }
}]);

