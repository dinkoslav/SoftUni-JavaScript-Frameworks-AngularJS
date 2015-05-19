'use strict';

var app = angular.module('socialApp', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

if(!localStorage.sessionToken){
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
