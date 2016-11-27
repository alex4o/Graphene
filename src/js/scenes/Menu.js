import paper from "paper"
import rasterLoad from "../util/rasterLoad"

function center(sprite) {
	sprite.anchor.set(.5, .5)
}

function easeInOut(t) { return (--t)*t*t+1 }

export default class VideoScene {
	constructor(story, stage){
		this.stage = stage
		this.story = story
		this.increment = 0.07
		this.index = -1
		this.animtoggle = true

		//this.Skip.onClick = () => story.next()

	}

	floatanimation(speed, w, h) {


		if(this.animtoggle)
		{
			this.Graphene.position.y += speed

			if(this.Graphene.position.y >  (this.h / 2) + 25)
			{
				this.animtoggle = false
			}
		} 
		else if (!this.animtoggle)
		{
			this.Graphene.position.y -= speed
			if (this.Graphene.position.y < (this.h / 2) - 25)
			{
				this.animtoggle = true
			}						
		}
	}

	position(width, height, center ){
		let off = height*(3/6)
		let rem = height - off
		let padding = rem/(this.texts.length + 1)
		let cur = padding
		for(let i = 0; i < this.texts.length; i++){
			let text = this.texts[i]
			text.x = width*(1/4)
			text.y = cur - 50 + (off / 2)
			
			cur += text.height + padding
		}


		this.Graphene.position.x = width/6*4
		this.Graphene.position.y = center.y

		this.w = width
		this.h = height


	}

	destructor(){
		// this.Skip.remove()

		// this.Skip.onMouseEnter = null
		// this.Skip.onMouseLeave = null
		// this.Skip.onClick = null
	}

	update(){
		this.floatanimation(0.1)

		if(this.index < 0){
			this.texts.forEach((text,index) => {
				if(this.index == index){
					return
				}

				if(text.scale.x > 1) {
					text.scale.x -= this.increment
					text.scale.y -= this.increment
				}
			})
			return
		}

		if(this.texts[this.index].scale.x < 1.2){
			this.texts[this.index].scale.x += this.increment 
			this.texts[this.index].scale.y += this.increment
		}


	}

	assetsLoaded(resources){

		this.texts = []
		this.Graphene =  new PIXI.Sprite(resources['graphene'].texture)
		center(this.Graphene)
		this.Graphene.scale.set(-0.8,0.8)

		this.texts.push(new PIXI.Text("Начало",
			{

				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 30
			})
		)

		this.texts.push(new PIXI.Text("Настройки",
			{

				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 30
			})		
		)

		this.texts.push(new PIXI.Text("За проекта",
			{

				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 30
			})
		)


		this.texts.push(new PIXI.Text("Изход",
			{

				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 30
			})
		)

		this.texts[0].click = () => {
			this.story.next()
		}

		this.texts[2].click = () => {

		}

		this.texts[2].click = () => {
			window.location = "/"
		}

		this.texts.forEach((text, index) => {
			text.interactive = true
			center(text)

			text.on('mouseover', () => {
				//text.scale.set(1.2,1.2)
				this.index = index

			})

			// set the mouseout callback...
			text.on('mouseout', () => {
				// text.scale.set(1,1)
				this.index = -1
			})

			this.stage.addChild(text)

		})

		this.stage.addChild(this.Graphene)

		// this.stage.addChild(this.button)
	}
}