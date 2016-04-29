import paper from "paper"

import Story from "./story"
import VolumeCtrl from "./VolumeCtrl"

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
// TODO: move to new file and find better name
class DialogueButtons {
	constructor(){
		this.list = []
		this.width = 0		
	}

	create(choices){
		this.remove()

		this.list = choices.map((choice,n) => {
			let group = new paper.Group()

			let text = new paper.PointText({
			//	point: point,
				content: choice,
				fillColor: "#AEE1F9",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: font_size,
				justification: "left"
			})
			text.onClick = () => window.next(n)

			let button = main_button.clone()
			button.visible = true
			button.setBounds(this.calculateButtonSize(text.bounds))

			group.addChild(button)
			group.addChild(text)

			this.width += group.getBounds().width

			return group
		})
	}

	calculateButtonSize(rect){
		let res_rect = R.clone(rect)
		let margin = 10
		res_rect.x -= margin/2
		res_rect.y -= margin/2
		res_rect.width += margin
		res_rect.height += margin

		return res_rect
	}

	calculate(size){
		//(re)calculate dialogue buttons
		let rem = size.width - this.width
		let padding = rem/(this.list.length + 1)
		let cur = padding
		for(let i = 0; i < this.list.length; i++){
			let group = this.list[i]
			group.bounds.x = cur
			group.bounds.y = size.height - 75
			
			cur += group.bounds.width + padding
		}
	}

	remove(){
		this.list.forEach(button => button.remove())
		this.list = []
		this.width = 0
	}
}

let story = new Story()

var canvas = null
var container = null

//var planet = null;
var graphene = null
var carbon = null

var video = null

var dbuttons = new DialogueButtons()

var talk_text = null

const font_size = 21


var g_text = null
var c_text = null

var timeout_id = 0

var main_button = null

var volume = new Atom(0.5)

var guz = false



story.onBefore("end_true",() => {

	story.showDialogue = false
	guz = true
	toggleCharacters(false)
	graphene.visible = true
	talk_text.visible = true


	graphene.setPosition(paper.view.center)
	talk_text.content = "А ти какво научи от всичко това?"	
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

function toggleCharacters(val){
	graphene.visible = val
	carbon.visible = val
	talk_text.visible = val
	g_text.visible = val
	c_text.visible = val
	paper.view.draw()
	paper.view.update(true)

}

function showDialogue(){
	let choices = story.choices()
	
	if(R.isArrayLike(choices)){
	//	console.log(choices)
		
		dbuttons.create(choices)
		dbuttons.calculate({height: window.innerHeight, width: window.innerWidth})

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

	dbuttons.remove()

	story.next(arg)
	if(story.hasDialogue()){
		
		showDialogue()
		toggleCharacters(true)
	}else{
		if(!guz){
			toggleCharacters(false)
		}
	}

	paper.view.update(true)

	video = show(video)
	video.volume = volume.get()

	console.log(video)
}

const volumeModifier = 0.05

window.addEventListener("load", () => {



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




	//planet = new paper.Raster("./mercury.png")

	graphene = new paper.Raster("./img/Graphene.png")
	carbon = new paper.Raster("./img/Carbon1.png")
	graphene.scale(-1,1)
	
	carbon.position.x = 100

	carbon.scale(0.8,0.8)
	graphene.scale(0.8,0.8)

	talk_text = new paper.PointText({
		point: paper.view.center,
	//	content: choices.who +": "+ choices.say,
		fillColor: "white",
		fontFamily: "Verdana",
		fontWeight: "bold",
		fontSize: font_size,
		justification: "center"
	})

	g_text = new paper.PointText({
		point: paper.view.center,
		content: "Графен",
		fillColor: "white",
		fontFamily: "Verdana",
		fontWeight: "bold",
		fontSize: font_size,
		justification: "center"
	})

	c_text = new paper.PointText({
		point: paper.view.center,
		content: "Карбон",
		fillColor: "white",
		fontFamily: "Verdana",
		fontWeight: "bold",
		fontSize: font_size,
		justification: "center"
	})
	

	talk_text.importSVG("./img/button.svg", e => {
		main_button = e
		main_button.visible = false
	})



	c_text.position.x = 100


	resize.onValue(size => {


		canvas.width = size.width
		canvas.height = size.height
		paper.view.setViewSize(size.width, size.height)


		g_text.position.x = size.width - 100
		graphene.position.x = size.width - 100

		
		dbuttons.calculate(size)

		// update by center
		let center = paper.view.center

		carbon.position.y = center.y - 100
		graphene.position.y = center.y - 100
		g_text.position.y = center.y + 200
		c_text.position.y = center.y + 200

		//redraw

		paper.view.update(true)
		paper.view.draw()
	})

	center.map(point => new paper.Point(point.x, (point.y * 2) - 100)).onValue(set(talk_text, "point"))

	paper.view.onMouseDown = () => {
		window.next()
	}
	
	video = show()
	toggleCharacters(false)
	
	let volCtrl = new VolumeCtrl(volume.get())

	volume.onValue(value => {
		if(video != null){
			video.volume = value
		}
		volCtrl.update(value)
	})

	console.log("Loaded")
}, false )

