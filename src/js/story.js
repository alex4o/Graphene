import R from "ramda"
import Dialogue from "./dialogue"
import paper from "paper"

var story = [
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
			vid.l = true
		}
		vid.src = element.src
		cache.push({src: element.src, video: vid})
		element.video = vid
	}
}

let convert = R.compose(R.map(R.zipObj(["name", "scene"])), R.toPairs)

export default class Story {
	constructor(types, update, loadingScene){
		this.update = update

		this.story = story
		this.showDialogue = false


		this.tags = {}

		this.dialogue = new Dialogue(this.tags)
		this.current = {
			"next" : this.story[0].scene
		}

		this.story.forEach(createVideo)
		console.log("Loaded videos:", cache)
		this.types = {}

		for(let t in types){
			this.types[t] = new types[t](this)
			this.types[t].hide()
		}

		let scenesArray = convert(this.types)

		Promise.all(scenesArray.map(t => t.scene.assetsLoaded())).then(e => {
			console.log("Assets loaded", e, scenesArray)


			loadingScene.hide()
			this.next()
		})



		this.sceneUi = {
			hide: () => {},
			show: () => {},
			position: () => {}
		}

		this.sceneUi = loadingScene

		this.old = { width: 1920, height: 1080 }
		this.uiCalc(window.innerWidth, window.innerHeight, paper.view.center, this.old)
		this.old = { width: window.innerWidth, height: window.innerHeight }

	}

	ui(type){
		this.sceneUi = this.types[type]
		this.sceneUi.show()
	}

	uiCalc(width, height, center){
		console.log("ui resize")
		this.sceneUi.position(width, height, center, this.old)
		this.update()
		this.old  = {width, height, center}
	}

	defaultVideo(){ //TODO: write to be more flexible
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
		console.log("Switching to:", scene)
		this.current = this.scene(scene) // switch the video with the next one
		if(this.current == null){
			throw "This scene does not exists"
		}

		if(oldVideo != this.current.video){
			this.onvideo(this.current.video)
		}

		this.sceneUi.hide()
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
		this.uiCalc(width, height, center)
	}
}