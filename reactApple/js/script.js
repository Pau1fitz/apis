var App = React.createClass({

	getInitialState: function(){

		return {
			active: 0,
			artists: ['Michael Jackson', 'Bob Dylan', 'Kendrick Lama', 'Elvis Presley', 'Daft Punk', 'Oasis'],
			songData: [],
			songs: [],
			playing: false,
			homeScreen: true,
			activeSong: 0
		}
	},

	increaseIndex: function() {
	    if(this.state.active === this.state.artists.length - 1) {
	        this.setState({active : 0});
	    }else{
	    	this.setState({active : this.state.active + 1});	
	    }

	},

	decreaseIndex: function() {
		if(this.state.active === 0) {
			this.setState({active : this.state.artists.length - 1});
		}else{
			this.setState({active : this.state.active - 1});
		}
	},

	getItunesData: function(){
		var self = this;
		$.ajax({
			url: 'https://itunes.apple.com/search?term=' + this.state.artists[this.state.active] + '&limit=5' ,
			method: 'GET',
			dataType: 'jsonp',
			success: function(data){
				this.setState({songData: data.results});
				data.results.map(function(song, index){
					self.state.songs.push(song.previewUrl)
				})
				
			}.bind(this)
		})
	},

	changeScreen: function(){
		this.setState({
			homeScreen: false
		})
	},

	audio: new Audio,

	playSong: function(){
		this.setState({playing: true});
		this.audio.src = this.state.songs[this.state.active];
		this.audio.play();
	},

	pauseSong: function() {
		this.audio.pause();
	},

	nextSong: function() {
		console.log('nextSong button ' + this.state.active)
		this.audio.src = this.state.songs[this.state.active];
		this.audio.play();
	},

	previousSong: function() {
		this.audio.src = this.state.songs[this.state.active];
		this.audio.play();
	},

	componentWillUpdate: function(nextProps, nextState) {
	  if (nextState.active !== this.state.active) {
	    this.audio.src = this.state.songs[nextState.active];
	    this.audio.play();
	  }
	},

	render: function () {
		var screen;
		if (this.state.homeScreen === true) {
		  	screen = <ArtistList active={this.state.active} artists={this.state.artists} playing={this.state.playing} />
		} else {
		  	screen = <SongList activeSong={this.state.activeSong} songData={this.state.songData} />
		}
		return(
			<div>
				<div id="screen">
					{screen}
				</div>
					<Button active={this.state.active} increment={this.increaseIndex} decrement={this.decreaseIndex} getItunesData={this.getItunesData} playSong={this.playSong} pauseSong={this.pauseSong} playing={this.state.playing} changeScreen={this.changeScreen} />
			</div>
		)
	}

});

var ArtistList = React.createClass({

	render: function() {
		var self = this;
		var listItems = this.props.artists.map(function(value, index){
			return(
				<li
			    	key={value} 
			    	className={self.props.active === index ? 'active' : ''}>
			    	{value}
			  	</li>
			)
		})
		return <ul>{listItems}</ul>
	}

});

var SongList = React.createClass({

	render: function() {
		var self = this;
		var songItems = this.props.songData.map(function(song, index){
				return(
					<li key={song.trackCensoredName}
						className={self.props.activeSong === index ? 'active' : ''}>
						{song.trackCensoredName}
					</li>
				)
		})
		return <ul>{songItems}</ul>
	}

});

var Button = React.createClass({

	onClick: function() {
		this.props.playSong();
	},

	getMusicAndNavigate: function() {
		this.props.getItunesData();
		this.props.changeScreen();
	},

	render: function() {
		
		return(
			<div className="button">
				<div className='menu'>MENU</div>
				
				<div className="next" onClick={this.props.increment}>
					<i className="fa fa-fast-forward" aria-hidden="true"></i>
				</div>
				
				<div className="pause">
					<i onClick={this.playSong} className="fa fa-play" aria-hidden="true"></i>
					<i onClick={this.props.pauseSong} className="fa fa-pause" aria-hidden="true"></i>
				</div>

				<div className="prev" onClick={this.props.decrement}>
					<i className="fa fa-fast-backward" aria-hidden="true"></i>
				</div>
		    	<div onClick={this.getMusicAndNavigate} className='inner-button'></div>
		    </div>
		)
	}
})

ReactDOM.render(<App/>, document.getElementById('app'));
