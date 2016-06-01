//Controller for the app
app.controller("instagramCtrl", ["$routeParams", "socialMedia", function ($routeParams, socialMedia) {
    instagramCtrl = this;
    this.instagramPosts = [];   
    this.loading = true;

    socialMedia.fetchInstagram().then(function(response) {
        instagramCtrl.loading = false;  
        for(var i = 0; i < 5; i++){
            instagramCtrl.instagramPosts.push(response.data[i]);
        }    
    })
    .catch(function(error){
        instagramCtrl.loading = false;
        instagramCtrl.error = true;
    });
}]);