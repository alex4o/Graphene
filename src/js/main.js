import _ from "lodash"; //because I can
import paper from "paper";
import rx from "rx"
import Story from "./story"

import {Kefir} from "kefir"
import Atom from "kefir.atom"

import R from "ramda"

window.R = R
window.p = paper

require("../css/global.css");

Kefir.Observable.prototype.pluck = function(prop) {
    return this.map(R.view(R.lensProp(prop)));
};


let story = new Story();
//import TabPanel from "./tabPanel.js";
story.onBefore("end_true",() => {
	window.location.href = "./test.html"
})

var canvas = null;
var container = null;

//var planet = null;
var graphene = null;
var carbon = null;

var video = null;

var tobjects = [];
var bobjects = [];
var talk_text = null;

var font_size = 22;


var g_text = null;
var c_text = null;

var timeout_id = 0;

var main_button = null;

var resize = Kefir.fromEvents(window, "resize").toProperty(() => null)
	.map((e) => {return {height: window.innerHeight, width: window.innerWidth}})

var center = resize.map(() => paper.view.center).toProperty(() => paper.view.center)

window.c = center

function set(obj, prop){
	return (val) => {
		obj[prop] = val
	}
}


function end(){
	window.next()
}

function toggleCharacters(val){
	graphene.visible = val
	carbon.visible = val
	talk_text.visible = val
	g_text.visible = val
	c_text.visible = val
}

function calculateTextPoint(n, N, center){
	let coef = ((n+1)/(N/2 + 0.5))
	return new paper.Point(center.x * coef, (center.y * 2) - 50);
}

function calculateButtonSize(rect){
	let res_rect = R.clone(rect)
	let margin = 10
	res_rect.x -= margin/2
	res_rect.y -= margin/2
	res_rect.width += margin
	res_rect.height += margin

	return res_rect
}

function showDialogue(){
	let choices = story.choices()
	
	if(_.isArray(choices)){
		console.log(choices)
		var length = choices.length
		bobjects = []

		tobjects = _.map(choices, (choice, n) => {
			var text = new paper.PointText({
			//	point: point,
				content: choice,
				fillColor: '#000080',
				fontFamily: 'Courier New',
				fontWeight: 'bold',
				fontSize: font_size,
				justification: "center"
			});



			let size = center.map(center => calculateTextPoint(n, length, center))
			
			size.onValue(set(text, "point"))


			let button = main_button.clone()

			button.visible = true


			size.onValue(val => {
				button.setBounds(calculateButtonSize(text.getBounds()))
			})

			bobjects.push(button)
			paper.view.draw();

			text.onClick = () => window.next(n)
			return text
		})


		window.tob = tobjects

	}else{
		talk_text.content = choices.who +": "+ choices.say;
		let len = choices.say.length
		let t = 0
		if(len < 10) {
			t = 5000
		}else{
			t = len * 200 
		}

		timeout_id = setTimeout(() => {
 			window.next()
		}, t)
	}
	paper.view.draw();

}

function show(current){
	let video = story.current.video
	if(video == current){
		return video;
	}else{
		if(current){
			console.log("Removeing: ", video)
			current.remove()
		}
	}

	window.video = video;
	video.addEventListener("ended", end);

	container.appendChild(video)
	video.play()
	return video

}

window.next = (arg) => {
	clearTimeout(timeout_id)
	if(story.hasChoices() && arg == null){
		return
	}

	story.next(arg)
	_.forEach(tobjects, o => o.remove())
	_.forEach(bobjects, o => o.remove())


	if(story.hasDialogue()){
		
		showDialogue()
		toggleCharacters(true)
	
	}else{
		toggleCharacters(false)
	}
	paper.view.update(true)

	video = show(video)
	console.log(video)
}



window.addEventListener("load", (event) => {
	console.log("Loading")

	canvas = document.getElementById("drawSurf")
	container = document.getElementById("container")

	paper.setup(canvas)


	resize.onValue(size => {
		canvas.width = size.width
		canvas.height = size.height
		paper.view.setViewSize(size.width, size.height);
		paper.view.draw();
		paper.view.update(true)
//		_.map(tobjects, (obj, n) => {
//			obj.point = calculateTextPoint(n, tobjects.length, paper.view.center)
//		})
	})

	//planet = new paper.Raster("./mercury.png")



	graphene = new paper.Raster("./Graphene.png")
	carbon = new paper.Raster("./Carbon1.png")
	graphene.scale(-1,1)
	window.g = graphene
	resize.pluck("width").toProperty().map(v => v - 100).onValue(set(graphene.position,"x"))
	carbon.position.x = 100

	carbon.scale(0.8,0.8)
	graphene.scale(0.8,0.8)

	/*resize.map((size) => {
		if(size.width > size.height){
			return 1920/size.width
		}else if(size.width < size.height){
			return 1080/size.height
		}else{
			return 1500/size.width
		}

	}).onValue((val) => {
		carbon.scale(val,val)
		graphene.scale(val,val)
	})*/






	talk_text = new paper.PointText({
		point: paper.view.center,
	//	content: choices.who +": "+ choices.say,
		fillColor: 'white',
		fontFamily: 'Courier New',
		fontWeight: 'bold',
		fontSize: font_size,
		justification: "center"
	});



	g_text = new paper.PointText({
		point: paper.view.center,
		content: "Графен",
		fillColor: 'white',
		fontFamily: 'Courier New',
		fontWeight: 'bold',
		fontSize: font_size,
		justification: "center"
	});


	c_text = new paper.PointText({
		point: paper.view.center,
		content: "Карбон",
		fillColor: 'white',
		fontFamily: 'Courier New',
		fontWeight: 'bold',
		fontSize: font_size,
		justification: "center"
	});
	

	talk_text.importSVG("button.svg", e => {
		main_button = e
		main_button.visible = false
	})


	resize.pluck("width").toProperty().map(v => v - 100).onValue(set(g_text.position,"x"))

	c_text.position.x = 100

	center.onValue((center) => {
		carbon.position.y = center.y - 100
		graphene.position.y = center.y - 100
		g_text.position.y = center.y + 200
		c_text.position.y = center.y + 200

	});

	center.map(point => new paper.Point(point.x, (point.y * 2) - 100)).onValue(set(talk_text, "point"))

	

	//planet.position = paper.view.center;
	
	paper.view.onMouseDown = () => {
		console.log("Everywhere click")
		window.next()
	}
	
	//center.onValue(set(planet, "position"))

	video = show()
	toggleCharacters(false)
	console.log("Loaded")
}, false )

