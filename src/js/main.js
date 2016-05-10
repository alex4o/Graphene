require("waypoints/lib/noframework.waypoints")
require("./Element.mutation.js")

require("../css/index.css")
// found that code on github
import scrollTo from "./util/scrollTo"
import AJPNG from "ajpng"

window.ajpng = AJPNG


// for eslint, couldn't find a way not to polute the environement

let Waypoint = window.Waypoint

let arrow = document.getElementById("scroll-arrow")

let info = document.getElementById("info")
let landing = document.getElementById("landing")

let to_game = document.getElementById("to-game")

let sources = document.getElementById("sources")
let logo = document.getElementById("logo")

sources.style.display = "none"

arrow.addEventListener("click", () => {
	scrollTo(window.innerHeight, 800)
})
/*
let icons = Array.from(document.getElementsByClassName("icon"))

Array.from(document.getElementsByClassName("paralax")).map((element,index) => {
	if(icons[index] != null){
		return new Waypoint({
			element: element,
			handler: () => {
				icons[index].classList.add("show")
			},
			offset: 250

		})
	}
})
*/

let butFlex = document.getElementById("but-flex")
let butStr = document.getElementById("but-str")
let butCond = document.getElementById("but-cond")

let videos = Array.from(document.getElementsByClassName("vid-box"))
let aicons = document.getElementsByClassName("animated")

/*
AJPNG.ifNeeded().then(() => {
	for (var i = 0; i < aicons.length; i++) {
		AJPNG.animateImage(aicons[i]).then(e => console.log(e)).catch(e => console.log(e))
	}
})
*/

function hideVideos(){
	videos.forEach(video => {
		video.classList.remove("show")
	})
	document.removeEventListener("click", hideVideos)

}

butFlex.addEventListener("click", () => {
	videos[0].classList.add("show")
	document.addEventListener("click", hideVideos)

})

butStr.addEventListener("click", () => {
	videos[1].classList.add("show")
	document.addEventListener("click", hideVideos)

})

butCond.addEventListener("click", () => {
	videos[2].classList.add("show")
	document.addEventListener("click", hideVideos)
	
})




let landingWaypoint = new Waypoint({
	element: landing,
	handler: (dir) => {
		//console.log(landing + " " + dir)
		if(dir == "up"){
			to_game.classList.remove("show")

		}else{ // dir == "down"
			to_game.classList.add("show")
		}
		//to_game.style.color = "black";
	},
	offset: -250
})

let infoWaypoint = new Waypoint({
	element: info,
	handler: (dir) => {
		if(dir == "down"){
				
		}
	},
	offset: 0
})


var landing_cont = landing.children[0]

setTimeout(() => {
	logo.classList.add("hidden")
}, 5000)

setTimeout(() => {
	landing_cont.classList.add("show")
}, 0)
//smoothScroll.init()