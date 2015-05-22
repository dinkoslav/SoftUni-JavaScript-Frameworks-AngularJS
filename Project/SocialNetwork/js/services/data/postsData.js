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

    function getUserWall(start, username) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'users/' + username + '/wall?StartPostId' + start + '=&PageSize=5',
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

    function likePost(postId){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'Posts/' + postId + '/likes',
            null,
            {
                'save': {
                    method: 'POST',
                    headers: headers
                }
            })
            .save();
    }

    function unlikePost(postId){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'Posts/' + postId + '/likes',
            null,
            {
                'delete': {
                    method: 'DELETE',
                    headers: headers
                }
            })
            .delete();
    }

    function deletePost(postId){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'Posts/' + postId,
            null,
            {
                'delete': {
                    method: 'DELETE',
                    headers: headers
                }
            })
            .delete();
    }

    function editPost(postId, text){
        var headers = authentication.getHeaders();
        var data = {
            'postContent': text
        };
        return $resource(
            baseServiceUrl + 'Posts/' + postId,
            null,
            {
                'update': {
                    method: 'PUT',
                    headers: headers
                }
            })
            .update(data);
    }

    function getPostById(postId) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'Posts/' + postId,
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

    function addCommentToPost(postId, text){
        var headers = authentication.getHeaders();
        var data = {
            'commentContent': text
        };
        return $resource(
            baseServiceUrl + 'Posts/' + postId + '/comments',
            null,
            {
                'save': {
                    method: 'POST',
                    headers: headers
                }
            })
            .save(data);
    }

    function likeComment(postId, commentId){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'Posts/' + postId + '/comments/' + commentId + '/likes',
            null,
            {
                'save': {
                    method: 'POST',
                    headers: headers
                }
            })
            .save();
    }

    function unlikeComment(postId, commentId){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'Posts/' + postId + '/comments/' + commentId + '/likes',
            null,
            {
                'delete': {
                    method: 'DELETE',
                    headers: headers
                }
            })
            .delete();
    }

    function deleteComment(postId, commentId){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'Posts/' + postId + '/comments/' + commentId,
            null,
            {
                'delete': {
                    method: 'DELETE',
                    headers: headers
                }
            })
            .delete();
    }

    function editComment(postId, commentId, text){
        var headers = authentication.getHeaders();
        var data = {
            'commentContent': text
        };
        return $resource(
            baseServiceUrl + 'Posts/' + postId + '/comments/' + commentId,
            null,
            {
                'update': {
                    method: 'PUT',
                    headers: headers
                }
            })
            .update(data);
    }

    function getPostComments(postId) {
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'Posts/' + postId + '/comments',
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
        getNewsFeed: getNewsFeed,
        getUserWall: getUserWall,
        likePost: likePost,
        unlikePost: unlikePost,
        deletePost: deletePost,
        editPost: editPost,
        getPostById: getPostById,
        addCommentToPost: addCommentToPost,
        likeComment: likeComment,
        unlikeComment: unlikeComment,
        deleteComment: deleteComment,
        editComment: editComment,
        getPostComments: getPostComments
    }
}]);