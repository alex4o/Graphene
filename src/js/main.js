import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash"; //because I can
window._ = _;
import paper from "paper";
import rx from "rx"
window.rx = rx;

import Vidoe from "./video";
window.paper = paper;

require("../css/global.css");

var story = [
	{
		"scene": "intro",
		"src": "intro.mp4",
		"choice": {
			"exsists": true,
			"list": [
				{ "show": "choice 1", "scene": "sc1"},
				{ "show": "choice 2", "scene": "sc2"},
				{ "show": "choice 4", "scene": "sc3"}
			]
		}
	},	
	{
		"scene": "sc1",
		"src": "sc1.mp4",
		"choice": {
			"exsists": false,
			"list": []
		}
	},	
	{
		"scene": "sc2",
		"src": "sc2.mp4",
		"choice": {
			"exsists": false,
			"list": []
		}
	},	
	{
		"scene": "sc3",
		"src": "sc3.mp4",
		"choice": {
			"exsists": false,
			"list": []
		}
	}
]

//import TabPanel from "./tabPanel.js";

class App extends React.Component 
{
	constructor(props){
		super(props)
		this.state = {
			scene: "intro",
			src: "preintro.mp4",
			sub: "intro.mp4",
			dis: "none",
			h: false
		}
	}

	componentDidMount(){
		window.video = this.video
		window.video2 = this.video2

		paper.setup(this.canvas)
		let planet = new paper.Raster("./mercury.png")
		window.planet = planet
		let pclick = rx.Observable.fromEvent(planet, "click");

		pclick.subscribe((e) => {
			planet.remove();
		});

		planet.onMouseEnter = (e) => {
			planet.opacity = 0.5
		}

		planet.onMouseLeave = (e) => {
			planet.opacity = 1
		}
  		paper.view.setViewSize(window.innerWidth, window.innerHeight);

		planet.position = paper.view.center;
		this.video.addEventListener("ended", (e) => {

			this.setState({dis: "block"});
		});

		window.addEventListener("resize", (e) => {
			this.canvas.width  = window.innerWidth;
  			this.canvas.height = window.innerHeight;
  			paper.view.setViewSize(window.innerWidth, window.innerHeight);
			planet.position = paper.view.center;

			paper.view.draw();
		});

		this.video.addEventListener("timeupdate", () => {

		//	if(this.video.currentTime >= 9.0) {
		//		this.video.currentTime = 8.0;
		//	}
		});

	}

	componentDidUpdate(){
		this.video.play();  
	}
	
	render(){
		return (
			<div>
				{ this.state.h ? "" : <video src={this.state.sub} ref={(ref) => this.video2 = ref}></video> }
				<video src={_.find(story, ["scene", this.state.scene])["src"]} ref={(ref) => this.video = ref}></video>


				<canvas id="drawSurf" className="draw" ref={(ref) => this.canvas = ref} resize="true"></canvas>
			</div>
			)
	}
}



document.addEventListener( "DOMContentLoaded", () => {
	ReactDOM.render(<App/>, document.getElementById('app-root'));
}, false )

