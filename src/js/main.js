import React from 'react';
import ReactDOM from 'react-dom';
import lodash from "lodash"; //because I can

//import TabPanel from "./tabPanel.js";

class App extends React.Component 
{
	constructor(props){
		super(props)
		this.state = {
			src: "preintro.mp4"
		}
	}

	componentDidMount(){
		window.video = this.video
		this.video.onended = (e) => {

			this.setState({src: "intro.mp4"});
		}
		this.video.addEventListener("timeupdate", function () {
    	    if(this.currentTime >= 5.0) {
    	        this.currentTime = 4.0;
    	    }
    	});

	}
	
	render(){
		return (
			<div>
				<h1>Hello graphene !!</h1>
				<video controls autoPlay ref={(ref) => this.video = ref}>
					<source src={this.state.src} type="video/mp4"/>
				</video>

			</div>
			)
	}
}

document.addEventListener( "DOMContentLoaded", () => {
	ReactDOM.render(<App/>, document.getElementById('app-root'));
}, false )

