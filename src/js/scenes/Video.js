import paper from "paper"
import rasterLoad from "../util/rasterLoad"


export default class VideoScene {
	constructor(story, stage){
		this.stage = stage
		this.story = story
		PIXI.loader.add('./img/skip-fs8.png')


		//this.Skip.onClick = () => story.next()

	}

	position(width, height /*, center*/ ){
		this.Skip.position.x = width - 120
		this.Skip.position.y = height - 120
	}

	destructor(){
		// this.Skip.remove()

		// this.Skip.onMouseEnter = null
		// this.Skip.onMouseLeave = null
		// this.Skip.onClick = null
	}

	update(){

	}

	assetsLoaded(resources){
		console.log(resources)
		this.Skip = new PIXI.Sprite(resources['./img/skip-fs8.png'].texture)


		// this.button = new PIXI.Sprite.fromImage("./img/button.svg")

		// this.button.position.y = 200
		// this.button.position.x = 200

		console.log(this.button)

		this.Skip.interactive = true
		//this.Skip = new paper.Raster("./img/skip-fs8.png")
		this.Skip.on("mouseover", () => this.Skip.alpha = 0.8)
		this.Skip.on("mouseout", () => this.Skip.alpha = 0.3)

		this.Skip.scale.set(0.2, 0.2)

		this.Skip.click = () => { this.story.next() }
		this.Skip.tap = () => { this.story.next() }

		this.Skip.alpha = 0.3




		this.stage.addChild(this.Skip)
		// this.stage.addChild(this.button)
	}
}