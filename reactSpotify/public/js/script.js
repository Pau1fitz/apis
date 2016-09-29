var App = React.createClass({

	getInitialState: function() {
	    return {
	          data: [],
	          access_token: '',
	          song: 0
	    };
	},

	componentDidMount: function() {
	    this.getAccessToken();
	},

	getHashParams: function() {
		var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
	},

	getAccessToken: function() {
		var params = this.getHashParams();
        this.state.access_token = params.access_token;
        this.getSpotifyData();
	},


	nextSong: function() {
	    if(this.state.song === this.state.data.length - 1) {
	        this.setState({song : 0});
	    }else{
	        this.setState({song : this.state.song + 1});
	    }
	},

	previousSong: function() {
		if(this.state.song === 0) {
			this.setState({song : this.state.data.length - 1});
		}else{
			this.setState({song : this.state.song - 1});
		}
		
	},

	getSpotifyData: function(){

		$.ajax({
			url: 'https://api.spotify.com/v1/users/sonymusicuk/playlists/1HAr7u5FrcFJuq8gI4bJcI/tracks',
            headers: { 'Authorization': 'Bearer ' + this.state.access_token },
			method: 'GET',
			success: function(response){
				this.setState({data: response.items});
			}.bind(this)
		})

	},

	render: function() {

		return(
			<div>
				<BackgroundImage src={this.state.data} image={this.state.song} />
				<Info />
				<Button src={this.state.data} song={this.state.song} nextSong={this.nextSong} previousSong={this.previousSong} />
			</div>
		)
	}
});

var BackgroundImage = React.createClass({

	render: function() {
		var images = this.props.src.map(function(photo, i){
			return(photo.track.album.images[1].url)
		})

		var divStyle = {
			background: 'url(' + images[this.props.image] + ')'
		}

		return(<div id='screen' style={divStyle}></div>)
	}

});

var Button = React.createClass({

	getInitialState: function(){
		return{
			songs:[],
			playing: false
		}
	},

	audio: new Audio,

	playSong: function(){
		console.log('playsong app ' + this.props.song)
		this.setState({playing: true});
		this.audio.src = this.state.songs[this.props.song];
		this.audio.play();
	},

	pauseSong: function() {
		this.setState({playing: false});
		this.audio.pause();
	},

	nextSong: function() {
		console.log('nextSong button ' + this.props.song)
		this.audio.src = this.state.songs[this.props.song];
		this.audio.play();
	},



	previousSong: function() {
		
		console.log('prevSong app ' + this.props.song)
		this.setState({playing: true});
		this.audio.src = this.state.songs[this.props.song];
		this.audio.play();
	},

	componentWillUpdate: function(nextProps, nextState) {
	  if (nextProps.song !== this.props.song) {
	    this.audio.src = this.state.songs[nextProps.song];
	    this.audio.play();
	  }
	},

	onClickNext: function(){
	    this.setState({playing: true});
	    this.props.nextSong();
	},

	onClickPrevious: function(){
		this.setState({playing: true});
	    this.props.previousSong();
	},

	render: function() {
		var self = this;
		var songs = this.props.src.map(function(song, i){
			self.state.songs.push(song.track.preview_url)
		})

		return (
			<div className="button">
				<div className='menu'>MENU</div>
				
				<div className="next" onClick={this.onClickNext}>
					<i className="fa fa-fast-forward" aria-hidden="true"></i>
				</div>
				
				<div className="pause">
					<i onClick={this.state.playing ? this.pauseSong : this.playSong}className="fa fa-play" aria-hidden="true"></i>
					<i onClick={this.state.playing ? this.pauseSong : this.playSong} className="fa fa-pause" aria-hidden="true"></i>
				</div>

				<div className="prev" onClick={this.onClickPrevious}>
					<i className="fa fa-fast-backward" aria-hidden="true"></i>
				</div>
		    	<div className='inner-button'></div>
		    </div>
		)
	}
});

var Info = React.createClass({
	render: function() {
		return(
			<div className="info">
		    	<div className="circle-one"></div>
		    	<div className="circle-two"></div>
		    	<div className="circle-three"></div>
		    	<p className="vendor">Vodafone</p>
		    	<p className="time">5:15 PM</p>
		    	<i className="bell fa fa-bell" aria-hidden="true"></i>
		    	<i className="battery fa fa-battery-three-quarters" aria-hidden="true"></i>
	    	</div>
		)
	}
})


var Header = React.createClass({
	render: function() {
		return(
			<div className='logo'>
				<img src='images/filtr-logo.png' />
			</div>
		)
	}
});

ReactDOM.render(<Header />, document.getElementById('loggedin'));
ReactDOM.render(<App />, document.getElementById('app'));