import R from "ramda"
import Dialogue from "./dialogue"
import videoCanplaythrough from "./util/videoCanplaythrough.js"

import parallax from "./util/parallax.js"

var story = [
	{
		"scene": "menu",
		"src": "vid/Background.mp4",
		"next": "intro",
		"type": "Menu"
	},
	{
		"scene": "intro",
		"src": "vid/Intro.mp4",
		"next": "begin",
		"type": "Video"
	},	
	{
		"scene": "begin",
		"src": "vid/Background.mp4",
		"dialogue": "begin",
		"type": "Dialogue"
	},
	{
		"scene": "asteroid",
		"src": "vid/Meteor.mp4",
		"next": "asteroid_dialogue",
		"type": "Video"
	},
	{
		"scene": "asteroid_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "asteroid_dialogue",
		"type": "Dialogue"
	},
	{
		"scene": "cars",
		"src": "vid/Cars.mp4",
		"next": "cars_dialogue",
		"type": "Video"
	},
	{
		"scene": "cars_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "cars_dialogue",
		"type": "Dialogue"
	},
	{
		"scene": "phone",
		"src": "vid/Phone.mp4",
		"next": "phone_dialogue",
		"type": "Video"
	},
	{
		"scene": "phone_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "phone",
		"type": "Dialogue"
	},
	{
		"scene": "blood",
		"src": "vid/Blood.mp4",
		"type": "Video",
		"next": "blood_dialogue"
	},	
	{
		"scene": "junktion_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "junkction_dialogue",
		"type": "Dialogue"
	},
	{
		"scene": "blood_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "blood_dialogue",
		"type": "Dialogue"
	},
	{
		"scene": "electrical_density_2",
		"src": "vid/Cars.mp4",
		"next": "end1",
		"type": "Video"
	},
	{
		"scene": "conductivity_2",
		"src": "vid/Phone.mp4",
		"next": "end1",
		"type": "Video"
	},
	{
		"scene": "electrical_density_good",
		"src": "vid/Cars.mp4",
		"next": "end2",
		"type": "Video"
	},
	{
		"scene": "conductivity_good",
		"src": "vid/Phone.mp4",
		"next": "good_mid",
		"type": "Video"
	},
	{
		"scene": "elevator",
		"src": "vid/Elevator.mp4",
		"type": "Video",
		"next": "elevator_dialogue"
	},
	{
		"scene": "elevator_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "elevator_dialogue",
		"type": "Dialogue"
	},
	{
		"src": "vid/Background.mp4",
		"dialogue": "ending_dialog_2",
		"scene": "end2",
		"type": "Dialogue"

	},
	{
		"src": "vid/Background.mp4",
		"scene": "end_true",
		"next": "test",
		"type": "End"
	},
	{
		"scene": "End",
		"src": "vid/Background.mp4",
		"type": "End"
	}	
]



window.s = story

var cache = []

function createVideo(element){
	var item = R.find(R.propEq("src", element.src))(cache)
	if(item != null){
		element.video = item.video

	}else{
		
		let vid = document.createElement("video")
		if(element.src == "vid/Background.mp4"){
			//vid.loop = true
			return 0;
			vid.l = true
		}
		vid.src = element.src
		cache.push({src: element.src, video: vid})
		element.video = vid
		vid.style.display = "none"


		// console.log(vid)
		this.appendChild(vid)

	}
}

function getWindowSize(){
	return { width: window.innerWidth, height: window.innerHeight, center: {x: window.innerWidth / 2, y: window.innerHeight / 2} }
}



//let convert = R.compose(R.map(R.zipObj(["name", "scene"])), R.toPairs)

export default class Story {
	constructor(types, renderer, container){
		this.renderer = renderer

		this.story = story
		this.showDialogue = false


		this.tags = {}

		this.dialogue = new Dialogue(this.tags)
		this.current = {
			"next" : this.story[0].scene
		}

		let r3dcontainer = document.getElementById("render3d")

		r3dcontainer.appendChild(parallax.renderer.domElement)

		this.story.forEach(createVideo.bind(container))

		let allVideos = Promise.all(cache.map(vid => videoCanplaythrough(vid)))


		console.log("Loaded videos:", cache)
		this.types = {}

		for(let t in types){
			let stage = new PIXI.Container()

			this.types[t] = new types[t](this, stage)
			this.types[t].stage = stage
			//his.types[t].hide()
		}

		//let scenesArray = convert(this.types)

		PIXI.loader.load((loader, resources) => { 
			

			for(let t in types){

				this.types[t].assetsLoaded(resources)
			}

			console.log("videos: ", cache.map(vid => vid.video.readyState))

			if(cache.map(vid => vid.video.readyState).reduce((curr, ret) => ret || curr == 4)){
				this.next()

			}else{
				allVideos.then(() => {
					this.next()

					console.log("222: story.js", "story.next()")

				}).catch(err => {
					console.log("224: story.js", err)
				})
			}


		})



		this.sceneUi = {
			hide: () => {},
			show: () => {},
			position: () => {}
		}

		this.ui("Loading")

		this.uiCalc()



		this.animate()
	
	}

	animate() {
		this.sceneUi.update()

		if(this.parallax){
			parallax.animation()
			parallax.renderer.render(parallax.scene, parallax.camera)
		}

		this.renderer.render(this.sceneUi.stage)

		requestAnimationFrame(this.animate.bind(this))
	}

	ui(type){

		this.sceneUi = this.types[type]

		if(this.sceneUi.click){
			this.renderer.view.onclick = this.sceneUi.click.bind(this.sceneUi)
			this.renderer.view.ontouchstart = this.sceneUi.click.bind(this.sceneUi)
		}else{
			this.renderer.view.onclick = null
			this.renderer.view.ontouchstart = null

		}

		//this.sceneUi.show()
	}

	uiCalc(){
		//console.log("ui resize")
		let {width, height, center} = getWindowSize()



		parallax.camera.aspect = width / height
		parallax.camera.updateProjectionMatrix()
		parallax.renderer.setSize( width, height )

		this.renderer.resize(width, height)


		this.sceneUi.position(width, height, center, this.old | getWindowSize())
		this.old  = {width, height, center}
	}

	defaultVideo(){ //TODO: write this to be more flexible
		return R.find(R.propEq("src", "vid/Background.mp4"))(cache)
	}

	scene(name){
		return R.find(R.propEq("scene", name))(this.story)
	}

	exists(scene){
		return this.scene(scene) != null
	}

	choices(){
		if(this.current.dialogue != null){
			if(this.dialogue.hasChoices()){
				return this.dialogue.choices()
			}else{
				return this.dialogue.say()
			}
		}
		if(this.current.choice != null){
			return this.current.choice.map(o => o.show)
		}
		else
		{
			return []
		}
	}

	hasChoices(){
		return this.current.choice != null || this.dialogue.hasChoices()
	}

	hasDialogue(){
		return this.showDialogue
	}

	neededVideos(){
		if(this.current.choice){
			return this.current.choice.map((e) => this.scene(e.scene))
		}else{
			return [ this.scene(this.current.next) ]
		}
	}

	onVideo(callback){
		this.onvideo = callback
	}

	switchTo(scene){
		//Before the switch
		let oldVideo = this.current.video
		if(oldVideo){

			oldVideo.style.display = "none"
			oldVideo.pause()
		}else{
			this.parallax = false
			document.getElementById("bgmusic").pause()

			oldVideo = "parallax"
		}

		console.log("Switching to:", scene)
		this.current = this.scene(scene) // switch the video with the next one
		if(this.current == null){
			throw "This scene does not exists"
		}

		if(oldVideo != this.current.video){
			if(this.current.video){
				this.current.video.style.display = "block"
				this.onvideo(this.current.video)
			}else{
				this.parallax = true
				document.getElementById("bgmusic").play()
			}
		}
		if(this.sceneUi.hide){
			this.sceneUi.hide()
		}

		this.ui(this.current.type)
		this.tags[scene] = 1

		if(this.current.dialogue != null){
			this.dialogue.select(this.current.dialogue)
			this.showDialogue = true
		}else{
			this.showDialogue = false
		}

		//After the switch
	}



	next(choice){
		if(this.current.dialogue != null){

			var scene = this.dialogue.next(choice)

			if(scene != null){
				this.switchTo(scene)
			}
		
		}else{
			this.switchTo(this.current.next)

		}
		
		if(this.showDialogue){
			if(this.dialogue.hasChoices()){
				this.sceneUi.dialogue(this.dialogue.say(), this.dialogue.choices())
			}else{
				this.sceneUi.dialogue(this.dialogue.say(), null)
			}
		}

		let {width, height, center} = this.old
		this.uiCalc()
	}
}