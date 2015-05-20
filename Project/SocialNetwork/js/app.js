'use strict';

var app = angular.module('socialApp', ['ngRoute', 'ngResource', 'ngStorage']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

if(!localStorage['ngStorage-access_token']){
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'templates/public/welcome.html'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }]);
} else{
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'templates/user/home.html'
        });
        $routeProvider.when('#/users/:username', {
            templateUrl: 'templates/public/home.html',
            controller: 'HomeController'
        });
        $routeProvider.when('#/users/:username/friends', {
            templateUrl: 'templates/public/home.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/profile', {
            templateUrl: 'templates/user/edit-profile.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/profile/password', {
            templateUrl: 'templates/user/change-password.html',
            controller: 'ChangePassController'
        });
        $routeProvider.when('/logout', {
            templateUrl: 'templates/user/logout.html',
            controller: 'LogoutController'
        });
    }]);
}
