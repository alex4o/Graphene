import React from 'react';
import ReactDOM from 'react-dom';
import lodash from "lodash"; //because I can

import paper from "paper";
window.paper = paper;

require("../css/global.css");

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
		paper.setup(this.canvas)
		let planet = new paper.Raster("./mercury.png")
		planet.position = paper.view.center;
		this.video.addEventListener("ended", (e) => {

			this.setState({src: "intro.mp4"});
		});

		window.addEventListener("resize", (e) => {
			this.canvas.width  = window.innerWidth;
  			this.canvas.height = window.innerHeight;
			paper.view.draw();
		});

		this.video.addEventListener("timeupdate", () => {

			if(this.video.currentTime >= 9.0) {
				this.video.currentTime = 8.0;
			}
		});

	}
	
	render(){
		return (
			<div>
				<video controls autoPlay ref={(ref) => this.video = ref}>
					<source src={this.state.src} type="video/mp4"/>
				</video>
				<canvas id="drawSurf" className="draw" ref={(ref) => this.canvas = ref}></canvas>

			</div>
			)
	}
}



document.addEventListener( "DOMContentLoaded", () => {
	ReactDOM.render(<App/>, document.getElementById('app-root'));
}, false )

