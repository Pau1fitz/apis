var App = React.createClass({

	getInitialState: function(){

		return {
			active: 0,
			artists: ['Michael Jackson', 'Bob Dylan', 'Kendrick Lama', 'Elvis Presley', 'Daft Punk', 'Oasis']
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

	render: function () {
		return(
			<div>
				<div id="screen">
					<ArtistList active={this.state.active} artists={this.state.artists} />
				</div>
					<Button increment={this.increaseIndex} decrement={this.decreaseIndex} />
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
	render: function() {
		return(
			
			<div className="button">
				<div className='menu'>MENU</div>
				
				<div className="next" onClick={this.props.increment}>
					<i className="fa fa-fast-forward" aria-hidden="true"></i>
				</div>
				
				<div className="pause">
					<i className="fa fa-play" aria-hidden="true"></i>
					<i className="fa fa-pause" aria-hidden="true"></i>
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