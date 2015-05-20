app.factory('authentication', ['$localStorage', '$sessionStorage', function($localStorage, $sessionStorage){
    function saveUserData(data){
        $localStorage.$default({
            'access_token': data.access_token
        });
    }

    function getHeaders(){
        var headers = {};
        var userToken = $localStorage['access_token'];
        if(userToken){
            headers.Authorization = "Bearer " + userToken;
        }

        return headers;
    }

    function removeUser() {
        $localStorage.$reset();
    }

    return{
        saveUser: saveUserData,
        getHeaders: getHeaders,
        removeUser: removeUser
    }
}]);