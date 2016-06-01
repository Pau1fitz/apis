//Controller for the app
app.controller("flickrCtrl", ["$routeParams", "socialMedia", function ($routeParams, socialMedia) {
    flickrCtrl = this;
    this.flickrPosts = [];   
    this.loading = true;

    //get the data from Flickr
    socialMedia.fetchFlickr().then(function(data) {
        var x = data.items.length;
        for(var i = 0; i < x; i++){
            flickrCtrl.flickrPosts.push(data.items[i]);
        }
        //lodash function to remove duplicates returned by API
        flickrCtrl.flickrPosts = _.uniqBy(flickrCtrl.flickrPosts , 'tags'); 
        flickrCtrl.loading = false; 
    })
    .catch(function(error){
        flickrCtrl.loading = false;
        flickrCtrl.error = true;
    });


}]);