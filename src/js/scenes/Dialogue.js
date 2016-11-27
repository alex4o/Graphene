
import Sprite from "../sprite"

import rasterLoad from "../util/rasterLoad"
import _ from "lodash"

function center(sprite) {
	sprite.anchor.set(.5, .5)
}

const font_size = 21

class DialogueButtons {
	constructor(fontSize, button, hover, clicked){
		this.list = []
		this.width = 0
		this.fontSize = 18 
		this.button = button	
		this.hover = hover
		this.clicked = clicked
		this.container = new PIXI.Container()

	}

	onSelect(callback){
		this.callback = callback
	}

	off(){
		this.callback = null
	}

	create(choices){
		this.remove()



		this.list = choices.map((choice,n) => {
			let group = new PIXI.Container()

			let text = new PIXI.Text(choice,
			{
				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: this.fontSize
			})

			text.click = () => this.callback(n)

			let button = new PIXI.mesh.NineSlicePlane(this.button, 15, 15, 15, 15)
			// center(button)

			console.log(button)
			//button.visible = true
			//this.calculateButtonSize(text.getBounds(), button.getBounds())
			let add = 20

			button.width = text.getBounds().width + add
			button.height = text.getBounds().height + add
			text.x += 12
			text.y += 8
			//text.getBounds().width + 10


			//button.setBounds()

			group.addChild(button)
			group.addChild(text)
			group.interactive = true
			group.click = () => {
				this.callback(n)
			}
			group.tap = () => this.callback(n)

			group.on('mouseover', () => {
				button.texture = this.hover
				button.width = text.getBounds().width + add
				button.height = text.getBounds().height + add
			})

			// set the mouseout callback...
			group.on('mouseout', () => {
				button.texture = this.button
				button.width = text.getBounds().width + add
				button.height = text.getBounds().height + add
			}).on('mousedown', () => {
				button.texture = this.clicked
				button.width = text.getBounds().width + add
				button.height = text.getBounds().height + add
			})


			// let rootButtonelement = button.children[1] // illogical but the first two are groups

			// group.onMouseEnter = e => {
			// 	rootButtonelement.shadowBlur = 50
			// 	rootButtonelement.shadowColor = new paper.Color(255,255,255)
			// }

			// group.onMouseLeave = e => {
			// 	rootButtonelement.shadowBlur = 0
			// 	rootButtonelement.shadowColor = new paper.Color(0,0,0)
			// }

			this.width += group.getBounds().width

			return group
		})

		this.list.map(e => this.container.addChild(e))
	}

	calculateButtonSize(textBounds, buttonBounds){

		//let res_rect = {...rect}
		let res_rect = bounds
		let margin = 10

		res_rect.x = rect.x - margin/2
		res_rect.y = rect.y - margin/2
		res_rect.width = rect.width + margin
		res_rect.height = rect.height + margin

		return res_rect
	}

	calculate(size){
		//(re)calculate dialogue buttons
		let rem = size.width - this.width
		let padding = rem/(this.list.length + 1)
		let cur = padding
		for(let i = 0; i < this.list.length; i++){
			let group = this.list[i]
			group.x = cur
			group.y = size.height - 75
			
			cur += group.width + padding
		}
	}

	remove(){
		//this.list.forEach(button => button.remove())
		this.container.removeChildren()
		this.list = []
		this.width = 0
	}
}

export default class DialogueScene {
	constructor(story, stage){
		this.stage = stage
		this.story = story

		PIXI.loader.add("graphene", "./img/Graphene-fs8.png")
		PIXI.loader.add("carbon","./img/Carbon2-fs8.png")

		PIXI.loader.add("carbon_atlas","./img/Carbon.json")
		PIXI.loader.add("graphene_atlas","./img/Graphene.json")


		// PIXI.loader.add("button","./img/button.png")
		PIXI.loader.add("button","./img/button.png")
		PIXI.loader.add("hover","./img/button_hover.png")
		PIXI.loader.add("clicked","./img/button_clicked.png")
		PIXI.loader.add("Play", "./img/buttons/Play.png")
		PIXI.loader.add("Paused", "./img/buttons/Paused.png")



	}

	assetsLoaded(resources){

		console.log(resources['carbon_atlas'])


		this.Graphene =  new PIXI.MovieClip(_.values(resources['graphene_atlas'].textures))
		center(this.Graphene)
		this.Graphene.animationSpeed = 0.25
		this.Graphene.play()


		
		// this.Graphene.scale.set(-1,1)

		//this.Enemy =  new PIXI.Sprite(PIXI.Texture.fromImage("123_0600.png"))
		this.Enemy = new PIXI.extras.MovieClip(_.values(resources['carbon_atlas'].textures))


		console.log(this.Enemy)

		center(this.Enemy)
		this.Enemy.animationSpeed = 0.25
		this.Enemy.play()

		this.Enemy.scale.set(0.7,0.7)
		this.Graphene.scale.set(0.7,0.7)

		window.g = this.Graphene

		this.Enemy.position.x = -70

		this.GrapheneText =  new PIXI.Text("Графен",
		{
			fill: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: font_size
		})



		this.EnemyText = new PIXI.Text("Карбон",
		{
			fill: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: font_size
		})
	
		// this.Graphene.importSVG("./img/button.svg", e => {
		// 	this.hiddenSampleButton = e
		// 	this.hiddenSampleButton.visible = false
		// 	window.hsb = this.hiddenSampleButton
		// 	

		// 	this.DialogueButtons.onSelect(n => {
		// 		this.story.next(n)
		// 	})

		// })


		this.DialogueButtons = new DialogueButtons(font_size, resources["button"].texture, resources["hover"].texture, resources["clicked"].texture)
		
		this.DialogueButtons.onSelect(n => {
			this.story.next(n)
		})


		this.talkText = new PIXI.Text("",
		{
			fill: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: font_size,
			align: 'center'
		})


		this.EnemyText.position.x = 200
		
		let ppbs = 0.4

		this.Play = new PIXI.Sprite(resources["Play"].texture)
		this.Play.interactive = true
		center(this.Play)

		this.Play.visible = true
		this.Play.scale.set(ppbs, ppbs)

		this.Pause = new PIXI.Sprite(resources["Paused"].texture)
		this.Pause.interactive = true
		
		center(this.Pause)


		this.Pause.visible = false
		this.Pause.scale.set(ppbs, ppbs)


		this.Play.click = () => {
			this.Play.visible = false
			this.Pause.visible = true
			this.paused = false
			this.play()
		}

		this.Pause.click = () => {
			this.Play.visible = true
			this.Pause.visible = false
			this.paused = true

			clearTimeout(window.timeout_next)
		}

		this.paused = true


		this.stage.addChild(this.Play)
		this.stage.addChild(this.Pause)

		this.stage.addChild(this.Enemy)
		this.stage.addChild(this.Graphene)

		this.stage.addChild(this.DialogueButtons.container)

		this.stage.addChild(this.talkText)
		this.stage.addChild(this.EnemyText)
		this.stage.addChild(this.GrapheneText)


	}

	play() {
		if(!this.story.hasChoices()){
			if(this.paused == false){
				window.timeout_next = setTimeout(() => {
					this.story.next()
				}, 5000)
			}
		}

	}

	update(){

	}

	click(){
		this.story.next()
	}

	dialogue(line, choices){
		if(choices == null){
			this.DialogueButtons.remove()

			this.talkText.text = line.who +": "+ line.say

		}else{

			this.DialogueButtons.create(choices)
			this.DialogueButtons.calculate({height: window.innerHeight, width: window.innerWidth})
		}

		this.play()

	}

	destructor(){
		this.DialogueButtons.off()
		// paper.view.onMouseDown = null // disable clicking on the screen

	}

	position(width, height, center){
		let TTbounds = this.talkText.getBounds()
		this.talkText.position.set(center.x - (TTbounds.width/2), height * (5/6))
		// console.log(this.talkText)

		this.GrapheneText.position.x  = width - 200
		this.Graphene.position.x = width - 150

		// this.Graphene.position.x = width - 500
		// this.GrapheneText.position.x = width - 200

		this.DialogueButtons.calculate({height, width})
		//= (center.y / 2) - 150
		// this.Graphene.position.y = this.Enemy.position.y  = (center.y / 2) - 150

		this.Graphene.position.y = this.Enemy.position.y = center.y - 100
		this.Enemy.position.x = 150 

		// console.log(this.Graphene)
		// console.log(this.Enemy)
		this.EnemyText.position.x = 125
		this.EnemyText.position.y = this.GrapheneText.position.y = center.y + 120

		this.Play.position.x = this.Pause.position.x = 50
		this.Play.position.y = this.Pause.position.y = height - 50

	}
}
