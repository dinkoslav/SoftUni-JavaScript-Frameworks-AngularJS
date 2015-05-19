'use strict';

var app = angular.module('socialApp', ['ngRoute', 'ngResource', 'ngStorage']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

if(!localStorage['ngStorage-access_token']){
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'templates/public/welcome.html',
            controller: 'WelcomeController'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }]);
} else{
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'templates/public/home.html',
            controller: 'HomeController'
        })
    }]);
}
