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

// TODO: move to new file and find better name

const volumeModifier = 0.05


var canvas = null
var container = null




var volume = new Atom(0.5)

/*
//gala --replace
*/

var mountedVideo = null

window.addEventListener("load", () => {
	console.log("Loading")

	canvas = document.getElementById("drawSurf")
	container = document.getElementById("container")
	paper.setup(canvas)

	let story = new Story({
		"Video": VideoUI,
		"Dialogue": DialogueUI,
		"End" : EndUI
	}, () => {
		paper.view.update(true)
		paper.view.draw()
	}, new LoadingUI())


	story.onVideo(video => {

		console.log("Removeing: ", video)
		if(mountedVideo != null){
			mountedVideo.remove()
		}

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

		container.appendChild(video)
		video.play()

		mountedVideo = video
		video.volume = volume.get()

	})

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

	window.hds = () => {
		story.next()
	}

	Kefir.fromEvents(window, "resize").toProperty(() => null).onValue(() => {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		paper.view.setViewSize(window.innerWidth, window.innerHeight)

		story.uiCalc(window.innerWidth, window.innerHeight, paper.view.center)
	})


	let volCtrl = new VolumeCtrl(volume.get())

	volume.onValue(value => {
		if(mountedVideo != null){
			mountedVideo.volume = value
		}
		volCtrl.update(value)
	})

	console.log("Loaded")
}, false )

