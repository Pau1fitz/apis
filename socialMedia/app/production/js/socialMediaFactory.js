"use strict";
//Factory used to make make AJAX calls to various APIs
app.factory('socialMedia', ['$http', function($http){
    //returns an object with methods calling various APIs
    return {
        fetchInstagram: function() {       
            var url = "https://api.instagram.com/v1/users/237513547/media/recent?client_id=cfce0d41765a41069b3171807d50e0a8&callback=JSON_CALLBACK";
            return $http.jsonp(url).then(function(response) {
                return response.data;
            });
        },
        fetchFlickr: function(){
            var url = "https://api.flickr.com/services/feeds/photos_public.gne?tags=calvinharris&tagmode=alll&format=json&jsoncallback=JSON_CALLBACK"
            return $http.jsonp(url).then(function(response) {
                return response.data;
            });
        },
        updateTwitter: function() {
            return $http({
                url: 'get_tweets.php',
                method: 'GET'
            })
        },
        fetchTwitter: function() {
            return $http({
                url: 'twitter_result.json',
                method: 'GET'
            })
        },
        getSongs: function () {
            return $http.jsonp('https://itunes.apple.com/search?term=calvin+harris&limit=25?format=jsonp&callback=JSON_CALLBACK')
        }
    }
}]);