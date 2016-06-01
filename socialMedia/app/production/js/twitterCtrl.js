// //Controller for the app
app.controller("twitterCtrl", ["$routeParams", "socialMedia", function ($routeParams, socialMedia) {
    twitterCtrl = this;
    this.twitterPosts = [];   
    this.loading = true;

    //Twitter request
    socialMedia.updateTwitter()
    .then(function(){
        socialMedia.fetchTwitter()
        .then(function(response){
            twitterCtrl.loading = false;
            var result = JSON.parse(response.data.twitter_result);
            for(var i = 0; i < result.length; i++){
                result[i].created_at = new Date(result[i].created_at);
                result[i].display = true;
                twitterCtrl.twitterPosts.push(result[i]);
            }      
        })
        .catch(function(error){
            twitterCtrl.loading = false;
            twitterCtrl.error = true;
        });
    });

    this.removeTweet = function(index) {
        this.twitterPosts.splice(index, 1);  
    };

}]);