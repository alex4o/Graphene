require("waypoints/lib/noframework.waypoints")
require("./Element.mutation.js")

require("../css/index.css")
// found that code on github
import Luminous from "luminous-lightbox"
// import Luminous from "Luminous"

import $  from "jquery"

// () => {} === function(){}
// for eslint, couldn't find a way not to polute the environement
let Waypoint = window.Waypoint
$(document).ready(() => {

	if(window.location.hash){
		$("body, html").animate({
			scrollTop: $( window.location.hash ).offset().top
		}, 1000)
	}

	$("a").click(function(){
		$("body, html").animate({
			scrollTop: $( $(this).attr("href") ).offset().top
		}, 800)
		return false;
	})

	// $("#landing").fadeIn()
})
let info = document.getElementById("info")
let to_game = document.getElementById("to-game")
let logo = document.getElementById("logo")

// arrow.addEventListener("click", () => {
// 	scrollTo(window.innerHeight, 800)
// })

let butFlex = document.getElementById("but-flex")
let butStr = document.getElementById("but-str")
let butCond = document.getElementById("but-cond")
let butEle = document.getElementById("but-ele")

let videos = Array.from(document.getElementsByClassName("vid-box"))

let thumbs = Array.from(document.getElementsByClassName("thumb"))

let options = {
	sourceAttribute: "src"
}

let lum = thumbs.map(thumb => {
	return new Luminous(thumb, options)
})


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
	videos[idx].play()



}

close.addEventListener("click", hideVideos)


// butFlex.addEventListener("click", () => {
// 	showVideo(0)
// })

butStr.addEventListener("click", () => {
	showVideo(1)
})

butCond.addEventListener("click", () => {
	showVideo(2)
})

butEle.addEventListener("click", () => {
	showVideo(3)
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