var App = React.createClass({

	getInitialState: function() {
	    return {
	         activeTrack: 0
	    };
	},

	render: function(){

		$.ajax({
			url: 'https://itunes.apple.com/search?term=kanye',
			method: 'GET',
			dataType: 'jsonp',
			success: function(data){
				console.log(data)
			}.bind(this)
		})

		return(
			<CommentList active={this.state.activeTrack} />
		)
	}



});

var CommentList = React.createClass({

	render: function() {
		return(
			<ul className="menu">
	  			<Comment />
	  		</ul>
  		)
	}

});

var Comment = React.createClass({

	render: function() {
		<div>
		<li className="first">Rod Stewart</li>
		<li className="active">Elvis Presley</li>
		<li>Kendrick Lamar</li>
		<li>A$ap Rocky</li>
		<li>Cliff Richard</li>
		<li>Paul Simon</li>
		</div>
	}

})

ReactDOM.render(<App />, document.getElementById('screen'));