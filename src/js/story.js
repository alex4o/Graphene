import _ from "lodash";
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
	var item = _.find(cache,["src", element.src])
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
		this.dialogue = new Dialogue();
		this.current = this.story[0];
		_.forEach(this.story, createVideo)
		console.log(cache)
	}

	defaultVideo(){
		return _.find(cache,["src", "vid/Background.mp4"])
	}

	scene(name){
		return _.find(this.story, ["scene", name])
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

		return _.map(this.current.choice, "show");
	}

	hasChoices(){
		return this.current.choice != null || this.dialogue.hasChoices()
	}


	hasDialogue(){
		return this.current.dialogue != null
	}

	neededVideos(){
		if(this.current.choice){
			return _.map(this.current.choice, (e) => this.scene(e.scene) )
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
			if(this.current.onAfter != null) this.current.onAfter()
			console.log("Switching to scene:", scene)

			this.current = this.scene(scene);
			console.log(this.current)
			if(this.current.onBefore != null) this.current.onBefore()


			if(this.current.dialogue != null){
				this.dialogue.select(this.current.dialogue)
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