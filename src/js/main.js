require("waypoints/lib/noframework.waypoints")

require("../css/index.css")
// found that code on github
import scrollTo from "./util/scrollTo"


// for eslint, couldn't find a way not to polute the environement

let Waypoint = window.Waypoint

let arrow = document.getElementById("scroll-arrow")

let info = document.getElementById("info")
let landing = document.getElementById("landing")

let to_game = document.getElementById("to-game")

arrow.addEventListener("click", () => {
	scrollTo(window.innerHeight, 800)
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

//smoothScroll.init()