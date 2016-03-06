import _ from "lodash";

var story = [
	{
		"scene": "intro",
		"src": "vid/Intro.mp4",
		"next": "conflict"
	},	
	{
		"scene": "conflict",
		"src": "vid/Background.mp4",
		"choice": [
			{ "show": "Покажи силата си", "scene": "provoke"},
			{ "show": "Използвай думи", "scene": "use_words"},
			{ "show": "Осави го", "scene": "provoke"}
		]
	},
	{
		"scene": "use_words",
		"src": "vid/Background.mp4",
		"choice": [
			{ "show": "Докажи, че си по добър", "scene": "compete"},
			{ "show": "Остави го да говори", "scene": ""},
			{ "show": "Игнорирай го", "scene": "provoke"}
		]
	},
	{
		"scene": "listen",
		"src": "vid/Background.mp4",
		"next": "tell_him_the truth"
	},	
	{
		"scene": "provoke",
		"src": "vid/Background.mp4",
		"next": "compete"
	},	
	{
		"scene": "compete",
		"src": "vid/Background.mp4",
		"choice": [
			{ "show": "Механична силиа", "scene": "mech_force"},
			{ "show": "Електропровидомост", "scene": "conductivity"},
			{ "show": "Енергийна плътност", "scene": "electrical_density"}
		]
	},
	{
		"scene": "electrical_density",
		"src": "vid/Cars.mp4",
		"choice": [
			{ "show": "Електропровидомост", "scene": "conductivity1"},
			{ "show": "Механична силиа", "scene": "mech_force1"},
		]
	},

	{
		"scene": "conductivity",
		"src": "vid/Phone.mp4",
		"choice": [
			{ "show": "Механична силиа", "scene": "mech_force3"},
			{ "show": "Енергийна плътност", "scene": "electrical_density3"}
		]
	},
	{
		"scene": "mech_force",
		"src": "vid/Meteor.mp4",
		"choice": [
			{ "show": "Електропровидомост", "scene": "conductivity2"},
			{ "show": "Енергийна плътност", "scene": "electrical_density2"}
		]
	},
	{
		"scene": "electrical_density2",
		"src": "vid/Cars.mp4",
		"next": "conductivity4"
	},	
	{
		"scene": "electrical_density3",
		"src": "vid/Cars.mp4",
		"next": "mech_force4"
	},
	{
		"scene": "conductivity1",
		"src": "vid/Phone.mp4",
		"next": "conductivity4"
	},	
	{
		"scene": "conductivity2",
		"src": "vid/Phone.mp4",
		"next": "mech_force4"
	},
	{
		"scene": "mech_force1",
		"src": "vid/Meteor.mp4",
		"next": "conductivity4"
	},	
	{
		"scene": "mech_force3",
		"src": "vid/Meteor.mp4",
		"next": "electrical_density4"
	},
	{
		"scene": "electrical_density4",
		"src": "vid/Cars.mp4",
		"next": "end1"
	},
	{
		"scene": "conductivity4",
		"src": "vid/Phone.mp4",
		"next": "end1"
	},
	{
		"scene": "mech_force4",
		"src": "vid/Meteor.mp4",
		"next": "1nd1"
	},
	{
		"src": "vid/Background.mp4",
		"scene": "end1"
	},
	{
		"src": "vid/Background.mp4",
		"scene": "end2"
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
		this.current = this.story[0];
		_.forEach(this.story, createVideo)
		console.log(cache)
	}

	scene(name){
		return _.find(this.story, ["scene", name])
	}

	choices(){
		return _.map(this.current.choice, "show");
	}

	neededVideos(){
		if(this.current.choice){
			return _.map(this.current.choice, (e) => this.scene(e.scene) )
		}else{
			return [ this.scene(this.current.next) ]
		}
	}

	next(){
		if(this.current.next){
			this.current = this.scene(this.current.next);
		}else{
			if(arguments.length > 0 && this.current.choice){
				if(arguments[0] <= this.current.choice.length){
					this.current = this.scene(this.current.choice[arguments[0]].scene);
				}else{
					throw "This path does not exists"
				}
			}else{
				throw "This transition to the next scene requires an argument"
			}
		}
	}
}