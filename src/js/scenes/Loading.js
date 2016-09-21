import paper from "paper"
import rasterLoad from "../util/rasterLoad"

let strings = [
	"Зарежда се, моля изчакайте",
	"Зарежда се, моля изчакайте.",
	"Зарежда се, моля изчакайте..",
	"Зарежда се, моля изчакайте..."
]

export default class LoadingScene {
	constructor(){
		let center = paper.view.center
		this.Graphene = new paper.Raster("./img/2313.png")
		this.Graphene.setPosition(center)
		this.Graphene.scale(0.6, 0.6)

		this.loadingText = new paper.PointText({
			point: new paper.Point(center.x - 160, (center.y * 2) - 120),
			content: strings[0],
			fillColor: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: 21,
			justification: "left"
		})

		this.backGround = new paper.Path.Rectangle({
			point: [0, 0],
			size: [paper.view.size.width, paper.view.size.height],
			strokeColor: "white",
			selected: true
		})
		this.backGround.sendToBack()
		this.backGround.fillColor = "#00AFEF"

		this.interval = setInterval(() => {
			requestAnimationFrame(this.frame.bind(this))
		}, 16)

		this.counter = 0
		this.string = 0

	}

	position(width, height, center, old){
		let scale_x = width / old.width
		let scale_y = height / old.height
		this.Graphene.setPosition(center)

		if(scale_x < 1 || scale_y < 1){
			this.Graphene.scale(Math.min(scale_x, scale_y)) 
			//console.log("old:", old, scale_y, scale_x)


		}else{
			this.Graphene.scale(Math.max(scale_x, scale_y)) 

		}

		// console.log(this.Graphene.scaling)
		this.loadingText.point = new paper.Point(center.x - 160, (center.y * 2) - 120)
		this.backGround.bounds.width = width
		this.backGround.bounds.height = height
		


	}

	hide(){
		this.Graphene.remove()
		this.loadingText.remove()
		this.backGround.remove()
		clearInterval(this.interval)
	}

	show(){

	}

	frame(){
		this.Graphene.rotate(3.14/3)
		if(this.counter == 25){
			this.string += 1
			if(this.string == strings.length){
				this.string = 0
			}
			this.loadingText.content = strings[this.string]
			this.counter = 0
		}
		this.counter += 1
	}

	destructor(story){
		
	}

	assetsLoaded(){
		
	}
}