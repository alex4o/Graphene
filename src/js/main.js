require("waypoints/lib/noframework.waypoints")
require("./Element.mutation.js")

require("../css/index.css")

// found that code on github
// import Luminous from "luminous-lightbox"
// import Luminous from "Luminous"


import $ from "jquery"
window.$ = $
window.jQuery = $

require("magnific-popup/dist/magnific-popup.css")
import mp from "magnific-popup/dist/jquery.magnific-popup.js"
window.mp = mp
/*
require("lightgallery/dist/css/lightgallery.min.css")
import lg from "lightgallery"
window.lg = lg

require("fluidbox/dist/css/fluidbox.min.css")
import fb from "fluidbox"
window.fb = fb
*/
// () => {} === function(){}
// for eslint, couldn't find a way not to polute the environement
let Waypoint = window.Waypoint
$(document).ready(() => {

	if (window.location.hash) {
		$("body, html").animate({
			scrollTop: $(window.location.hash).offset().top
		}, 1000)
	}

	$(".thumb").attr("src", function() {
	//	$(this).attr("href", $(this).attr("src"))
	})

	//$(".thumb").parent().lightGallery()

	$("#gallery").magnificPopup({
		delegate: "a",
		type: "image",
		mainClass: "guzGolqm",
		image: {
			verticalFit: true
		},
		gallery: {
			enabled: true
		},
		callbacks: {
			open: function() {
				console.log(this.el)
			}
		}
	})

	$("#scroll-arrow").click(function() {
		$("body, html").animate({
			scrollTop: $($(this).attr("href")).offset().top
		}, 800)
		return false
	})

	// $("#landing").fadeIn()
})
let info = document.getElementById("info")
let to_game = document.getElementById("to-game")
let logo = document.getElementById("logo")

let table = {
	strength: "./vid/Meteor.mp4", 
	conductivity: "./vid/Cars.mp4",
	flexibility: "./vid/Blood.mp4"
}
let video = $("#vid-box-vid")
let box = $("#vid-box")
let close = $(".close")

function showVideo(src) {
	console.log("src: ", src)
	console.log("video: ", video)
	

	video.attr("src", src)
	box.fadeIn(500)

	video[0].play()
}

close.click(function(){

	video[0].pause()
	box.fadeOut(500)

})


$(".demo").click(function(){
	showVideo(table[$(this).data("type")])
})

let landingWaypoint = new Waypoint({
	element: landing,
	handler: (dir) => {
		//console.log(landing + " " + dir)
		if (dir == "up") {
			to_game.classList.remove("show")

		} else { // dir == "down"
			to_game.classList.add("show")
		}
		//to_game.style.color = "black";
	},
	offset: -250
})

let infoWaypoint = new Waypoint({
	element: info,
	handler: (dir) => {
		if (dir == "down") {

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
