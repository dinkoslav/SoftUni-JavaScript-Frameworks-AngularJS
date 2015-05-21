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

    return{
        addNewPost: addNewPost
    }
}]);