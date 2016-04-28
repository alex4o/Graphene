require("waypoints/lib/noframework.waypoints")

require("../css/index.css")
// found that code on github
import scrollTo from "./util/scrollTo"




let arrow = document.getElementById("scroll-arrow")

let info = document.getElementById("info");
let landing = document.getElementById("landing");

let to_game = document.getElementById("to-game");

arrow.addEventListener("click", e => {
	scrollTo(window.innerHeight, 800)
})

let waypoint = new Waypoint({
	element: landing,
	handler: (dir) => {
		//console.log(landing + " " + dir)
		if(dir == "up"){
			to_game.style.display = "none"

		}else{ // dir == "down"
			to_game.style.display = "block"
		}
		//to_game.style.color = "black";
	},
	offset: -100
})

//smoothScroll.init()