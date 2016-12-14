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

import DialogueUI from "./scenes/Dialogue.js"
import VideoUI from "./scenes/Video.js"
import EndUI from "./scenes/End.js"
import LoadingUI from "./scenes/Loading.js"
import MenuUI from "./scenes/Menu.js"


// TODO: move to new file and find better name


var PIXI = require('pixi.js')


var TEX = require('pixi-compressed-textures');


console.log(PIXI)


const volumeModifier = 0.05


var canvas = null
var container = null


if(!localStorage.getItem("volume")){
	localStorage.setItem("volume", 0.5)
}

if(!localStorage.getItem("autoplay")){
	localStorage.setItem("autoplay", false)
}
 
window.volume = new Atom(JSON.parse(localStorage.getItem("volume")))
window.autoplay = new Atom(JSON.parse(localStorage.getItem("autoplay")))
window.quality = new Atom(JSON.parse(localStorage.getItem("quality")))

/*
//gala --replace
*/

var mountedVideo = null

window.addEventListener("load", () => {
	console.log("Loading")

	canvas = document.getElementById("drawSurf")
	container = document.getElementById("container")
	let render = document.getElementById("render")
	
	let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{ transparent: true })

	var extensions = PIXI.compressedTextures.detectExtensions(renderer);
	console.log(extensions)
	// PIXI.loader.loader = new PIXI.loaders.Loader();
	// window.loader.before(PIXI.compressedTextures.imageParser());

	//PIXI.loader.before(PIXI.compressedTextures.imageParser())

	renderer.autoResize = true

	render.appendChild(renderer.view)

	//paper.setup(canvas)

	let story = new Story({
		"Video": VideoUI,
		"Loading": LoadingUI,
		"Dialogue": DialogueUI,
		"End" : EndUI,
		"Menu": MenuUI

	}, renderer, container)


	story.onVideo(video => {

		console.log("Removeing: ", video)
		// if(mountedVideo != null){
			// mountedVideo.remove()
		// }

		console.log(video.l)
		if(video.l){
			console.log("Looping vid!")
			video.addEventListener("ended", (ctxv) => {
			//	console.log(ctxv)
				video.currentTime = 0
				video.play()
			})

		}else{
			video.addEventListener("ended", () => story.next())
		}

		// container.appendChild(video)
		video.play()

		mountedVideo = video
		video.volume = volume.get()

	})

	Kefir.fromEvents(window.document.body , "mousewheel").map(e => e.wheelDelta < 0 ? -volumeModifier : volumeModifier).onValue(mod => {
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

	window.hds = () => {
		story.next()
	}

	Kefir.fromEvents(window, "resize").toProperty(() => null).onValue(() => {
		//renderer.resize(window.innerWidth, window.innerHeight)

		//canvas.width = window.innerWidth
		//canvas.height = window.innerHeight
		//paper.view.setViewSize(window.innerWidth, window.innerHeight)

		story.uiCalc()
	})


	//let volCtrl = new VolumeCtrl(volume.get())

	autoplay.onValue(value => {
		console.log("setItem autoplay")
		localStorage.setItem("autoplay", value)
	})

	volume.onValue(value => {
		if(mountedVideo != null){
			mountedVideo.volume = value
		}

		console.log("setItem volume:", value)
		localStorage.setItem("volume", value)

		document.getElementById("bgmusic").volume = value

		//volCtrl.update(value)
	})

	console.log("Loaded")
}, false )

