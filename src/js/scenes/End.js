
import rasterLoad from "../util/rasterLoad"

function center(sprite) {
	sprite.anchor.set(.5, .5)
}

export default class EndScene {
	constructor(story, stage){
	this.story = story
	this.stage = stage
		// this.Graphene = new paper.Raster("./img/Graphene.png")
		// PIXI.loader.add("graphene", "./img/Graphene-fs8.png")

	
	}

	assetsLoaded(resources){
		
		this.Graphene =  new PIXI.Sprite(resources['graphene'].texture)
		center(this.Graphene)
		this.Graphene.interactive = true
		this.Graphene.scale.set(-1,1)

		this.Graphene.visible = true

		this.Graphene.click = () => {
			window.location = window.location.pathname.replace("game","test") + "#end"

			//window.location.pathname = window.location.pathname.replace("game","index")
		}

		this.Graphene.tap = () => {
			window.location = window.location.pathname.replace("game","test") + "#end"

			//window.location.pathname = window.location.pathname.replace("game","index")
		}

		this.talkText = new PIXI.Text("А ти какво научи от всичко това?",
		{
			fill: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: 21,
		})

		this.talkText.visible = true


		this.stage.addChild(this.Graphene)
		this.stage.addChild(this.talkText)

		//this.Graphene.setPosition(paper.view.center)
	}

	position(width, height, center){
		this.Graphene.position.set(center.x, center.y)
		this.talkText.position.set(center.x - this.talkText.getBounds().width/2, (center.y * 2) - 130)

	}

	update(){

	}

	destructor(){
		
	}
}