import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash"; //because I can
//import TabPanel from "./tabPanel.js";

class Video extends React.Component 
{
	constructor(props){
		super(props)
		this.state = {
			src: this.props.startSrc,
			pool: [""]
		}
	}

	componentDidMount(){
		

	}

	componentDidUpdate(){
		this.video.play();  
	}

	resolveVideos(){
		var videos = _.filter(this.people, (p) => {
			return _.includes(_.map(this.props.storyLocationc,"scene"), p.name);  
		});
		
	}
	
	render(){
		return (
			<div>
				{ this.resolveVideos() }
				<video src={this.state.src} ref={(ref) => this.video = ref}></video>
				<video src={this.state.sub} style={{display: this.state.dis}} ref={(ref) => this.video2 = ref}></video>
			</div>
			)
	}
}



