"use strict";
//Regex filter for getting Flickr username returns everything between brackets
app.filter('regex', function() {
    return function(val){
    var regExp = /\(([^)]+)\)/,
        match = regExp.exec(val);
    if(match !== null)
        return match[1];
   };
});

//Use Angular's Strict Contextual Escaping to obtain the original value of the url
app.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);