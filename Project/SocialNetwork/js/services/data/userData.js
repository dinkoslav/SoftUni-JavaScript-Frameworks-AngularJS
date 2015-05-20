app.factory('userData', ['$resource', 'baseServiceUrl', 'authentication', function($resource, baseServiceUrl, authentication){
    function registerUser(user){
        return $resource(baseServiceUrl + 'users/register')
            .save(user);
    }

    function loginUser(user){
        return $resource(baseServiceUrl + 'users/login')
            .save(user);
    }

    function logoutUser(){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'users/logout',
            null,
            {
                'save': {
                    method: 'POST',
                    headers: headers
                }
            })
            .save();
    }

    function getLoggedUserData(){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'me',
            null,
            {
                'get': {
                    method: 'GET',
                    headers: headers
                }
            })
            .get();
    }

    function changeUserPassword(password){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'me/changepassword',
            null,
            {
                'put': {
                    method: 'PUT',
                    headers: headers
                }
            })
            .put(password);
    }

    function editProfile(user){
        var headers = authentication.getHeaders();
        return $resource(
            baseServiceUrl + 'me',
            null,
            {
                'put': {
                    method: 'PUT',
                    headers: headers
                }
            })
            .put(user);
    }

    return{
        register: registerUser,
        login: loginUser,
        logout: logoutUser,
        getLoggedUserData: getLoggedUserData,
        changePassword: changeUserPassword,
        editProfile: editProfile
    }
}]);
