import R from "ramda"
import Dialogue from "./dialogue"







var story = [
	{
		"scene": "intro",
		"src": "vid/Intro.mp4",
		"next": "conflict"
	},	
	{
		"scene": "conflict",
		"src": "vid/Background.mp4",
		"dialogue": "intro_dialog",
	},
	{
		"scene": "mech_force",
		"src": "vid/Meteor.mp4",
		"next": "mech_force_dialog"
	},
	{
		"scene": "mech_force_dialog",
		"src": "vid/Background.mp4",
		"dialogue": "asteroid_dialog",
	},
	{
		"scene": "compete_kind",
		"src": "vid/Background.mp4",
		"dialogue": "compete_kind_dialog"
	},
	{
		"scene": "compete_hard",
		"src": "vid/Background.mp4",
		"dialogue": "compete_hard_dialog"
	},
	{
		"scene": "electrical_density",
		"src": "vid/Cars.mp4",
		"next": "ed_dialog"

	},
	{
		"scene": "conductivity",
		"src": "vid/Phone.mp4",
		"next": "c_dialog"
	},
	{
		"scene": "ed_dialog",
		"src": "vid/Background.mp4",
		"dialogue": "ed_c_dialog"
	},	
	{
		"scene": "c_dialog",
		"src": "vid/Background.mp4",
		"dialogue": "c_c_dialog"
	},
		{
		"scene": "electrical_density_2",
		"src": "vid/Cars.mp4",
		"next": "end1"

	},
	{
		"scene": "conductivity_2",
		"src": "vid/Phone.mp4",
		"next": "end1"
	},

	{
		"scene": "electrical_density_good",
		"src": "vid/Cars.mp4",
		"next": "end2"

	},
	{
		"scene": "conductivity_good",
		"src": "vid/Phone.mp4",
		"next": "good_mid"
	},

	{
		"scene": "good_mid",
		"src": "vid/Background.mp4",
		"dialogue": "good_dialog"
	},

	{
		"src": "vid/Background.mp4",
		"scene": "end1",
		"dialogue": "ending_dialog_1"
	},
	{
		"src": "vid/Background.mp4",
		"dialogue": "ending_dialog_2",
		"scene": "end2"
	},
	{
		"src": "vid/Background.mp4",
		"scene": "end_true",
		"next": "test"
	},
	{
		"src": "vid/Background.mp4",
		"scene": "test"
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
			vid.loop = true;
		}
		vid.src = element.src;
		cache.push({src: element.src, video: vid})
		element.video = vid;
	}
	
}

export default class Story {
	constructor(){
		this.story = story;
		this.showDialogue = false;
		this.dialogue = new Dialogue();
		this.current = this.story[0];
		this.story.forEach(createVideo)
		console.log(cache)
	}

	defaultVideo(){
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


	setHasDialogue(bool /* bool */){
		this.showDialogue = bool
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

	//events for the scene

	onBefore(scene, fn){
		if(this.exists(scene)){
			this.scene(scene).onBefore = fn
		}
	}

	offBefore(scene){
		if(this.exists(scene)){
			delete this.scene(scene).onBefore
		}
	}

	onAfter(scene, fn){
		if(this.exists(scene)){
			this.scene(scene).onAfter = fn
		}
	}

	offAfetr(scene){
		if(this.exists(scene)){
			delete this.scene(scene).onAfter
		}
	}



	switchTo(scene){
		if(scene != null){
			if(this.current.onAfter != null){ // calls onAfter just before switching the video
				this.current.onAfter()
			}

			this.current = this.scene(scene); // switch the video with the next one

			if(this.current.dialogue != null){
				this.dialogue.select(this.current.dialogue)
				this.showDialogue = true;
			}else{
				this.showDialogue = false;
			}

			if(this.current.onBefore != null){ // call onBefore for the the next video 
				this.current.onBefore()
			}


		}
	}

	next(choice){
		if(this.current.dialogue != null){
			var scene = this.dialogue.next(choice)
			this.switchTo(scene)
		
		}else{
			this.switchTo(this.current.next)

		}


	}
}