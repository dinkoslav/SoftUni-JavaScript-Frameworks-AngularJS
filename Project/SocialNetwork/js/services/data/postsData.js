app.factory('postsData', ['$resource', 'baseServiceUrl', 'authentication', function($resource, baseServiceUrl, authentication) {
    function addNewPost(text, username){
        var headers = authentication.getHeaders();
        var data = {
            'postContent': text,
            'username':username
        };
        return $resource(
            baseServiceUrl + 'posts',
            null,
            {
                'save': {
                    method: 'POST',
                    headers: headers
                }
            })
            .save(data);
    }

    function getNewsFeed(start) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'me/feed?StartPostId=' + start + '&PageSize=5',
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
        addNewPost: addNewPost,
        getNewsFeed: getNewsFeed
    }
}]);