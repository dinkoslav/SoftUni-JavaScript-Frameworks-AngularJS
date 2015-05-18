'use strict';

var app = angular.module('socialApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'templates/public/welcome.html',
        controller: 'WelcomeController'
    })
}]);