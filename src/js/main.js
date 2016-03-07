import _ from "lodash"; //because I can
import paper from "paper";
import rx from "rx"
import Story from "./story"
window.p = paper
window.rx = rx
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

function set(obj, path){
	return (val) => {
		obj[path] = val
	}
}


window.addEventListener("load", (event) => {

	var canvas = null;
	var container = null;
	var planet = null;

	var video = null;

	var tobjects = null;

	canvas = document.getElementById("drawSurf")
	paper.setup(canvas)

	var size = rx.Observable.fromEvent(window, "resize").map(() => { return { width: window.innerWidth, height: window.innerHeight} }).do((size) => {
		paper.view.setViewSize(size.width, size.height);
		paper.view.draw();
	})

	console.log(size)





	var center = size.map((e) => paper.view.center) // clone the object to be sure for the map

	
	var height = size.pluck("height")
	var width = size.pluck("width")

	height.do(set(canvas, "height"))
	width.do(set(canvas, "width"))

	center.do(set(planet, "position"))



	center.subscribe((x) => console.log(x))


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
				
				let coef = ((n+1)/(length/2 + 0.5))
				



				//console.log(point)
				var text = new paper.PointText({
					content: choice,
					fillColor: 'white',
					fontFamily: 'Courier New',
					fontWeight: 'bold',
					fontSize: 20,
					justification: "center"
				});

				center.map((center) => new paper.Point(center.x * coef, (center.y * 2) - 50)).do(set(text, "point"))


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


	console.log("Hello")

	container = document.getElementById("container")


	planet = new paper.Raster("./mercury.png")
	planet.position = paper.view.center;
	planet.onClick = () => {
		planet.remove()
	}

	video = show()


}, false )

