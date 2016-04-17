import paper from "paper"
import Story from "./story"

import {Kefir} from "kefir"
import Atom from "kefir.atom"

import R from "ramda"

require("./Element.mutation.js")

window.R = R
window.p = paper

require("../css/global.css")

Kefir.Observable.prototype.pluck = function(prop) {
	return this.map(R.view(R.lensProp(prop)))
}


let story = new Story()

var canvas = null
var container = null

//var planet = null;
var graphene = null
var carbon = null

var video = null

var gobjects = []

var talk_text = null

var font_size = 22


var g_text = null
var c_text = null

var timeout_id = 0

var main_button = null

var volume = new Atom(0.5)

story.onBefore("end_true",() => {

	story.showDialogue = true

	toggleCharacters(false)
	graphene.visible = true
	talk_text.visible = true


	graphene.setPosition(paper.view.center)
	talk_text.content = "А ти какво научи от всико това?"	
	paper.view.update(true)

})

//gala --replace

story.onBefore("test",() => {
	window.location.href = "./test.html"
})

var resize = Kefir.fromEvents(window, "resize").toProperty(() => null)
	.map(() => {return {height: window.innerHeight, width: window.innerWidth}})

var center = resize.map(() => paper.view.center).toProperty(() => paper.view.center)

function set(obj, prop){
	return (val) => {
		obj[prop] = val
	}
}

window.createVolumeCtrl = () => {
	var size = {
		x: 20,
		y: 20,
		w: 60
	}
	size.h = 3*size.w

	var path = {
		mw: 23, // margin width,x
		mh: 15 // margin height,y
	}
	var volCtrlGroup = new paper.Group()

	let rect_out_box = new paper.Rectangle(size.x,size.y, size.w, size.h)
	var box = new paper.Shape.Rectangle(rect_out_box)
	box.fillColor = "black"

	volCtrlGroup.addChild(box)

	let rect_blue_path = new paper.Rectangle(size.x + path.mw, size.y + path.mh, size.w - (path.mw*2), (size.h - 20) - (path.mh*2))
	var path_blue = new paper.Shape.Rectangle(rect_blue_path)
	path_blue.fillColor = "#000080"

	volCtrlGroup.addChild(path_blue)


	var vol = ((volume.get() * 100) | 0)


	let rect_white_path = new paper.Rectangle(size.x + path.mw, size.y + path.mh, size.w - (path.mw*2), (((size.h - 20) - (path.mh*2)) * (1 - volume.get())) | 0)
	var path_white = new paper.Shape.Rectangle(rect_white_path)
	path_white.fillColor = "white"

	volCtrlGroup.addChild(path_white)


	let text = new paper.PointText({
		point: new paper.Point(size.x + (size.w/2), size.w + ((size.h - 25) - (path.mh*2))),
		content: vol + "%",
		fillColor: "white",
		fontFamily: "Sans Serif",
		fontWeight: "bold",
		fontSize: 13,
		justification: "center"
	})

	volCtrlGroup.addChild(text) 

	volCtrlGroup.visible = false

	window.vcg = volCtrlGroup

	var black_line = new paper.Shape.Rectangle(new paper.Rectangle(size.x + path.mw, size.y + path.mh, size.w - (path.mw*2), 1))
	black_line.fillColor = "black"
	
	volume.onValue((value) => {
		volCtrlGroup.visible = true
		clearTimeout(window.vol_timout)

		let vol = ((value * 100) | 0)
		let bounds = new paper.Rectangle(size.x + path.mw, size.y + path.mh, size.w - (path.mw*2), (((size.h - 20) - (path.mh*2)) * (1 - value)) | 0)

		if(bounds.height < 1) {
			bounds.height = 1
		}

		path_white.setBounds(bounds)
		text.content = vol + "%"
		paper.view.draw()

		window.vol_timout = setTimeout(() => {
			volCtrlGroup.visible = false
			paper.view.draw()
		}, 500)
	})


	paper.view.draw()
}

function toggleCharacters(val){
	graphene.visible = val
	carbon.visible = val
	talk_text.visible = val
	g_text.visible = val
	c_text.visible = val
	paper.view.draw()
	paper.view.update(true)

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
	
	if(R.isArrayLike(choices)){
	//	console.log(choices)
		gobjects = []

		let width = 0
		gobjects = choices.map((choice,n) => {
			let group = new paper.Group()

			let text = new paper.PointText({
			//	point: point,
				content: choice,
				fillColor: "#000080",
				fontFamily: "Courier New",
				fontWeight: "bold",
				fontSize: font_size,
				justification: "left"
			})
			text.onClick = () => window.next(n)

			let button = main_button.clone()
			button.visible = true
			button.setBounds(calculateButtonSize(text.bounds))

			group.addChild(button)
			group.addChild(text)

			width += group.getBounds().width

			return group
		})

		resize.onValue(size => {
			let rem = size.width - width
			let padding = rem/(gobjects.length + 1)
			let cur = padding
			for(let i = 0; i < gobjects.length; i++){
				let group = gobjects[i]
				group.bounds.x = cur
				group.bounds.y = size.height - 75
				
				cur += group.bounds.width + padding

			}

			paper.view.draw()
		})

		paper.view.draw()
	}else{

		talk_text.content = choices.who +": "+ choices.say
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
	paper.view.draw()

}

function show(current){
	let video = story.current.video
	if(video == current){
		return video
	}else{
		if(current){
			console.log("Removeing: ", video)
			current.remove()
		}
	}

	video.addEventListener("ended", () => window.next())

	container.appendChild(video)
	video.play()
	return video

}

window.next = (arg) => {
	clearTimeout(timeout_id)
	if(story.hasChoices() && arg == null){
		return
	}

	gobjects.forEach(o => o.remove())

	story.next(arg)

	if(story.hasDialogue()){
		
		showDialogue()
		toggleCharacters(true)
	
	}else{
		toggleCharacters(false)
	}
	paper.view.update(true)

	video = show(video)
	video.volume = volume.get()

	console.log(video)
}

const volumeModifier = 0.05

window.addEventListener("load", (event) => {
	console.log("Loading")

	canvas = document.getElementById("drawSurf")
	container = document.getElementById("container")

	Kefir.fromEvents(canvas, "mousewheel").map(e => e.wheelDelta < 0 ? -volumeModifier : volumeModifier).onValue(mod => {
		volume.modify(old => {
			let volume = old + mod
			if(volume < 0){
				volume = 0
			}else if(volume > 1){
				volume = 1
			}
			return volume
		})

	})

	paper.setup(canvas)

	volume.onValue(vol => {
		if(video != null)
			video.volume = vol
	})

	resize.onValue(size => {
		canvas.width = size.width
		canvas.height = size.height
		paper.view.setViewSize(size.width, size.height);

		paper.view.draw();
		paper.view.update(true)
	})

	//planet = new paper.Raster("./mercury.png")

	graphene = new paper.Raster("./Graphene.png")
	carbon = new paper.Raster("./Carbon1.png")
	graphene.scale(-1,1)
	
	resize.pluck("width").toProperty().map(v => v - 100).onValue(set(graphene.position,"x"))
	carbon.position.x = 100

	carbon.scale(0.8,0.8)
	graphene.scale(0.8,0.8)

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
		window.next()
	}
	
	//center.onValue(set(planet, "position"))

	video = show()
	toggleCharacters(false)
	
	createVolumeCtrl()

	console.log("Loaded")
}, false )

