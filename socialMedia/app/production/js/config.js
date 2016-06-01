"use strict";
//configure the roues for the app
app.config(function($routeProvider) {
    $routeProvider. 
       when('/', {
         templateUrl: 'app/production/views/home.html',
         controller: 'sonyMusicCtrl as ctrl'
       }).
       when('/twitter', {
         templateUrl: 'app/production/views/twitter.html',
         controller: 'twitterCtrl as ctrl'
       }).
       when('/instagram', {
         templateUrl: 'app/production/views/instagram.html',
         controller: 'instagramCtrl as ctrl'
       }).
       when('/flickr', {
         templateUrl: 'app/production/views/flickr.html',
         controller: 'flickrCtrl as ctrl'
       }).
       otherwise({
         redirectTo: '/'
       });
});