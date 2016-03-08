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
		"src": "vid/End.mp4",
		"scene": "end_true"
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

	next(choice){
		if(this.current.dialogue != null){
			var scene = this.dialogue.next(choice)
			if(scene != null){
				console.log("Switching scene:", scene)
				this.current = this.scene(scene);
				if(this.current.dialogue != null){
					this.dialogue.select(this.current.dialogue)
				}
				return;
			}else{
				return;
			}
		}

		console.log("Switching from: ", this.current)

		if(this.current.next){
			this.current = this.scene(this.current.next);
		}else{
			if(arguments.length > 0 && this.current.choice){
				if(choice <= this.current.choice.length){
					this.current = this.scene(this.current.choice[choice].scene);
				}else{
					throw "This path does not exists"
				}
			}else{
				throw "This transition to the next scene requires an argument"
			}
		}

		if(this.current.dialogue != null){
			this.dialogue.select(this.current.dialogue)
		}

	}
}