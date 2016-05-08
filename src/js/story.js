import R from "ramda"
import Dialogue from "./dialogue"

var story = [
	{
		"scene": "intro",
		"src": "vid/Intro.mp4",
		"next": "conflict",
		"type": "Video"
	},	
	{
		"scene": "conflict",
		"src": "vid/Background.mp4",
		"dialogue": "intro_dialog",
		"type": "Dialogue"

	},
	{
		"scene": "mech_force",
		"src": "vid/Meteor.mp4",
		"next": "mech_force_dialog",
		"type": "Video"

	},
	{
		"scene": "mech_force_dialog",
		"src": "vid/Background.mp4",
		"dialogue": "asteroid_dialog",
		"type": "Dialogue"

	},
	{
		"scene": "compete_kind",
		"src": "vid/Background.mp4",
		"dialogue": "compete_kind_dialog",
		"type": "Dialogue"

	},
	{
		"scene": "compete_hard",
		"src": "vid/Background.mp4",
		"dialogue": "compete_hard_dialog",
		"type": "Dialogue"

	},
	{
		"scene": "electrical_density",
		"src": "vid/Cars.mp4",
		"next": "ed_dialog",
		"type": "Video"
	},
	{
		"scene": "conductivity",
		"src": "vid/Phone.mp4",
		"next": "c_dialog",
		"type": "Video"

	},
	{
		"scene": "ed_dialog",
		"src": "vid/Background.mp4",
		"dialogue": "ed_c_dialog",
		"type": "Dialogue"
	},	
	{
		"scene": "c_dialog",
		"src": "vid/Background.mp4",
		"dialogue": "c_c_dialog",
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
		"scene": "good_mid",
		"src": "vid/Background.mp4",
		"dialogue": "good_dialog",
		"type": "Dialogue"
	},

	{
		"src": "vid/Background.mp4",
		"scene": "end1",
		"dialogue": "ending_dialog_1",
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
		"src": "vid/Background.mp4",
		"scene": "test",
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
			vid.loop = true
		}
		vid.src = element.src
		cache.push({src: element.src, video: vid})
		element.video = vid
	}
	
}

export default class Story {
	constructor(types, update){
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

		this.sceneUi = {
			hide: () => {},
			show: () => {},
			position: () => {}
		}

		this.old = {}

	}

	ui(type){
		this.sceneUi = this.types[type]
		this.sceneUi.show()
	}

	uiCalc(width, height, center){
		this.old  = {width, height, center}
		this.sceneUi.position(width, height, center)
		this.update()
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
		this.current = this.scene(scene) // switch the video with the next one
		if(oldVideo != this.current.video){
			this.onvideo(this.current.video)
		}

		this.sceneUi.hide()

		this.ui(this.current.type)

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
				this.sceneUi.dialogue(null, this.dialogue.choices())
			}else{
				this.sceneUi.dialogue(this.dialogue.say(), null)
			}
		}

		let {width, height, center} = this.old
		this.uiCalc(width, height, center)
	}
}