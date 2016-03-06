import _ from "lodash"; //because I can
import paper from "paper";
import rx from "rx"
import Story from "./story"
window.p = paper
require("../css/global.css");


let story = new Story();
//import TabPanel from "./tabPanel.js";

function componentDidMount(){
	
	this.pclick = 
		this.pclick.subscribe((e) => {
		if(story.current.src == "default"){
			story.next();
		}
		//planet.remove();
	});
		
	planet.onMouseEnter = (e) => {
		planet.opacity = 0.5
	}
	
	planet.onMouseLeave = (e) => {
		planet.opacity = 1
	}
	
	paper.view.setViewSize(window.innerWidth, window.innerHeight);
	planet.position = paper.view.center;
	console.log("WTF:", window, this);
	

}


var canvas = null;
var container = null;
var planet = null;

var video = null;

var tobjects = null;

var resize = rx.Observable.fromEvent(window, "resize")
	.map((e) => {return {height: window.innerHeight, width: window.innerWidth}})
	.tap((size) => {
		canvas.width = size.width
		canvas.height = size.height
		paper.view.setViewSize(size.width, size.height);
	})

resize.subscribe((size) => {
	planet.position = paper.view.center;
	paper.view.draw();
})

function end(){
	story.next()
	_.forEach(tobjects, (o) => o.remove())
	video.remove()
	video = show()

}

function show(){
	let video = story.current.video
	
	let choices = story.choices()
	if(choices.length!= 0){
		console.log(choices)
		var length = choices.length
		tobjects = _.map(choices, (choice, n) => {
			
			let point = new paper.Point();
			point.x = paper.view.center.x;
			point.y = paper.view.center.y;


			let coef = ((n+1)/(length/2 + 0.5))

			point.x = point.x * coef
			point.y = (point.y * 2) - 50
			console.log(point)
			let text = new paper.PointText({
				point: point,
				content: choice,
				fillColor: 'white',
				fontFamily: 'Courier New',
				fontWeight: 'bold',
				fontSize: 20,
				justification: "center"
			});
			paper.view.draw();
			text.onClick = () => window.next(n)
			return text
		})
	}

	window.video = video;
	video.addEventListener("ended", end);

	container.appendChild(video)
	video.play()
	return video

}

window.next = (args) => {
	story.next(args)
	video.remove()
	_.forEach(tobjects, (o) => o.remove())
	video = show()

}

window.addEventListener("load", (event) => {
	console.log("Hello")

	canvas = document.getElementById("drawSurf")
	container = document.getElementById("container")

	paper.setup(canvas)
	planet = new paper.Raster("./mercury.png")
	planet.position = paper.view.center;
	planet.onClick = () => {
		planet.remove()
	}
	video = show()


}, false )

