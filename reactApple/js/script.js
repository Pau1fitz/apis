var App = React.createClass({

	getInitialState: function(){

		return {
			active: 0,
			artists: ['Michael Jackson', 'Bob Dylan', 'Kendrick Lama', 'Elvis Presley', 'Daft Punk', 'Oasis'],
			songs: []
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
		$.ajax({
			url: 'https://itunes.apple.com/search?term=' + this.state.artists[this.state.active] ,
			method: 'GET',
			dataType: 'jsonp',
			success: function(data){
				this.setState({songs: data.results});
			}.bind(this)
		})
	},

	render: function () {
		return(
			<div>
				<div id="screen">
					<ArtistList active={this.state.active} artists={this.state.artists} />
				</div>
					<Button active={this.state.active} songs={this.state.songs} increment={this.increaseIndex} decrement={this.decreaseIndex} search={this.getItunesData} />
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

var Button = React.createClass({

	getInitialState: function(){
		return{
			songs:[],
			playing: false
		}
	},

	audio: new Audio,

	playSong: function(){
		console.log('playsong app ' + this.props.active)
		this.setState({playing: true});
		this.audio.src = this.state.songs[this.props.active];
		this.audio.play();
	},

	pauseSong: function() {
		this.setState({playing: false});
		this.audio.pause();
	},

	nextSong: function() {
		console.log('nextSong button ' + this.props.active)
		this.audio.src = this.state.songs[this.props.active];
		this.audio.play();
	},

	previousSong: function() {
		
		console.log('prevSong app ' + this.props.active)
		this.setState({playing: true});
		this.audio.src = this.state.songs[this.props.active];
		this.audio.play();
	},

	componentWillUpdate: function(nextProps, nextState) {
	  if (nextProps.active !== this.props.active) {
	    this.audio.src = this.state.songs[nextProps.active];
	    this.audio.play();
	  }
	},

	onClick: function(){
		this.playSong();
		this.props.search();
	},

	render: function() {
		var self = this;

		var songs = this.props.songs.map(function(song){
			self.state.songs.push(song.previewUrl);
		})
		
		return(
			
			<div className="button">
				<div className='menu'>MENU</div>
				
				<div className="next" onClick={this.props.increment}>
					<i className="fa fa-fast-forward" aria-hidden="true"></i>
				</div>
				
				<div className="pause">
					<i onClick={this.onClick} className="fa fa-play" aria-hidden="true"></i>
					<i onClick={this.pauseSong} className="fa fa-pause" aria-hidden="true"></i>
				</div>

				<div className="prev" onClick={this.props.decrement}>
					<i className="fa fa-fast-backward" aria-hidden="true"></i>
				</div>
		    	<div className='inner-button'></div>
		    </div>
		)
	}
})

ReactDOM.render(<App/>, document.getElementById('app'));