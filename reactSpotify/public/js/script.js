var App = React.createClass({

	getInitialState: function() {
	    return {
	          data: [],
	          photo: 0,
	          access_token: ''
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

	nextPhoto: function() {
		this.state.photo += 1;
		console.log(this.state)
	},

	render: function() {

		return(
			<div>
				<BackgroundImage src={this.state.data} item={this.state.photo}/>
				<Info />
				<Button photo={this.nextPhoto} />
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
			background: 'url(' + images[3] + ')'
		}

		return(<div id='screen' style={divStyle}></div>)
	}

});

var Button = React.createClass({

	render: function() {
		return (
			<div onClick={this.props.photo} className="button">
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