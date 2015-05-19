app.factory('userData', ['$resource', 'baseServiceUrl', 'authentication', function($resource, baseServiceUrl, authentication){
    function registerUser(user){
        return $resource(baseServiceUrl + 'users/register')
            .save(user);
    }

    function loginUser(user){
        return $resource(baseServiceUrl + 'users/login')
            .save(user);
    }

    function logoutUser(user){
        return $resource(baseServiceUrl + 'users/logout')
            .save(user);
    }

    return{
        register: registerUser,
        login: loginUser,
        logout: logoutUser
    }
}]);
