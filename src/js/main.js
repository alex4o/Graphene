require("waypoints/lib/noframework.waypoints")
require("./Element.mutation.js")

require("../css/index.css")
// found that code on github
import scrollTo from "./util/scrollTo"
import Luminous from "luminous-lightbox"

window.ps = Luminous

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

let butFlex = document.getElementById("but-flex")
let butStr = document.getElementById("but-str")
let butCond = document.getElementById("but-cond")

let videos = Array.from(document.getElementsByClassName("vid-box"))

let thumbs = Array.from(document.getElementsByClassName("thumb"))

function showLightbox(src){
	console.log("Showing lightbox:", src)
}
let options = {
	sourceAttribute: 'src'
}
thumbs.map(thumb => {
	return new Luminous(thumb, options)
	// thumb.addEventListener("click", () => {
	// 	showLightbox(thumb.src)
	// })
})


let luminous 

let close = document.getElementById("close")

function hideVideos(){
	videos.forEach(video => {
		video.pause()
		video.classList.remove("show")
		video.classList.remove("display")

	})

	close.classList.remove("show")


}

function showVideo(idx){
	videos[idx].classList.add("display")

	videos[idx].classList.add("show")
	close.classList.add("show")


}

close.addEventListener("click", hideVideos)


butFlex.addEventListener("click", () => {
	showVideo(0)
})

butStr.addEventListener("click", () => {
	showVideo(2)
})

butCond.addEventListener("click", () => {
	showVideo(1)
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