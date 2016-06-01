//Controller for the app
app.controller("sonyMusicCtrl", ["$routeParams", "socialMedia", function ($routeParams, socialMedia) {
    sonyMusicCtrl = this;
    this.songs = [];
    this.media = new Audio(); 
    this.loading = true;

    socialMedia.getSongs()
    .success(function (data) {
        for (var i = 0; i < data.resultCount; i++) {
            sonyMusicCtrl.songs.push(data.results[i].previewUrl)
        }
    }) 
    .catch(function(error){      
        console.log(error);
    });

    //Play song methods
    this.playSong = function () {
        sonyMusicCtrl.media.pause();
        sonyMusicCtrl.media = new Audio(sonyMusicCtrl.songs[randomSong()]);
        sonyMusicCtrl.media.play();
    };

    this.stopSong = function () {
        sonyMusicCtrl.media.pause();
    };

    //choose a random song from list returned from iTunes
    randomSong = function(){
        return Math.round(Math.random() * (sonyMusicCtrl.songs.length - 1));
    };

    //Angular equivalent of document.ready
    //used to spin the record
    this.load = function(){
        $('.play').click(function () {
            $('.record').stop(true, true).rotate({
                count: 30,
                forceJS: true
            });
        });
        $('.stop').click(function () {
            $('.record').stop(true, true)
        });
    };

    //invoke load function
    this.load();
}]);