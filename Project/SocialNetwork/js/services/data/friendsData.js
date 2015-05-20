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

    return{
        getUserFriendRequests: getUserFriendRequests
    }
}]);

