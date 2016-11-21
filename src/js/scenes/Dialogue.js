import paper from "paper"
import Sprite from "../sprite"

import rasterLoad from "../util/rasterLoad"

const font_size = 21

class DialogueButtons {
	constructor(fontSize, button){
		this.list = []
		this.width = 0
		this.fontSize = fontSize
		this.button = button	
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
			let group = new paper.Group()

			let text = new paper.PointText({
			//	point: point,
				content: choice,
				fillColor: "#AEE1F9",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: this.fontSize,
				justification: "left"
			})
			text.onClick = () => this.callback(n)

			let button = this.button.clone()
			button.visible = true
			button.setBounds(this.calculateButtonSize(text.bounds, button))

			group.addChild(button)
			group.addChild(text)

			let rootButtonelement = button.children[1] // illogical but the first two are groups

			group.onMouseEnter = e => {
				rootButtonelement.shadowBlur = 50
				rootButtonelement.shadowColor = new paper.Color(255,255,255)
			}

			group.onMouseLeave = e => {
				rootButtonelement.shadowBlur = 0
				rootButtonelement.shadowColor = new paper.Color(0,0,0)
			}

			this.width += group.getBounds().width

			return group
		})
	}

	calculateButtonSize(rect, { bounds }){
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
			group.bounds.x = cur
			group.bounds.y = size.height - 75
			
			cur += group.bounds.width + padding
		}
	}

	remove(){
		this.list.forEach(button => button.remove())
		this.list = []
		this.width = 0
	}
}

export default class DialogueScene {
	constructor(story){
		this.story = story

		//this.Graphene = new Sprite("./img/ga-fs8.png", new paper.Size(720, 720))
		this.Graphene = new paper.Raster("./img/Graphene-fs8.png",new paper.Size(720, 720))
		
		this.Graphene.scale(-1,1)

		//this.Enemy = new Sprite("./img/cl-fs8.png", new paper.Size(720, 720))
		this.Enemy = new paper.Raster("./img/Carbon2-fs8.png", new paper.Size(720, 720))


		this.Enemy.scale(0.8,0.8)
		this.Graphene.scale(0.8,0.8)

		window.g = this.Graphene

		this.Enemy.position.x = -70

		this.GrapheneText = new paper.PointText({
			point: paper.view.center,
			content: "Графен",
			fillColor: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: font_size,
			justification: "center"
		})

		this.EnemyText = new paper.PointText({
			point: paper.view.center,
			content: "Карбон",
			fillColor: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: font_size,
			justification: "center"
		})
	
		this.Graphene.importSVG("./img/button.svg", e => {
			this.hiddenSampleButton = e
			this.hiddenSampleButton.visible = false
			window.hsb = this.hiddenSampleButton
			this.DialogueButtons = new DialogueButtons(font_size, this.hiddenSampleButton.children[1])

			this.DialogueButtons.onSelect(n => {
				this.story.next(n)
			})

		})

		this.talkText = new paper.PointText({
			point: paper.view.center,
		//	content: choices.who +": "+ choices.say,
			fillColor: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: font_size,
			justification: "center"
		})


		this.EnemyText.position.x = 200
		
		let ppbs = 0.4

		this.Play = new paper.Raster("./img/buttons/Play.png")
		this.Play.position = paper.view.center
		this.Play.visible = false
		this.Play.scale(ppbs, ppbs)

		this.Pause = new paper.Raster("./img/buttons/Paused.png")
		this.Pause.position = paper.view.center
		this.Pause.visible = false
		this.Pause.scale(ppbs, ppbs)


		this.Play.onClick = () => {
			this.Play.visible = false
			this.Pause.visible = true
			this.paused = false
			this.play()
		}

		this.Pause.onClick = () => {
			this.Play.visible = true
			this.Pause.visible = false
			this.paused = true

			clearTimeout(window.timeout_next)
		}

		this.paused = true


	}

	assetsLoaded(){
		let assets = [this.Play, this.Pause, this.Graphene, this.Enemy]
		//console.log(assets.map(rasterLoad).map(p => p.then(e => console.log("p loaded a: ", e))))
		//console.log(assets.map(e => e.constructor == Sprite))
		return Promise.all(assets.map(rasterLoad))
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

	dialogue(line, choices){
		if(choices == null){
			this.DialogueButtons.remove()

			this.talkText.content = line.who +": "+ line.say

			paper.view.onMouseDown = (e) => {
				// console.log(e.event.button == 0)
				if(e.event.button == 0){
					this.story.next()
				}
			}

		}else{
			if(line != null && line.say != null){
				this.talkText.content = line.who +": "+ line.say
			}

			paper.view.onMouseDown = null // disable clicking on the screen

			this.DialogueButtons.create(choices)
			this.DialogueButtons.calculate({height: window.innerHeight, width: window.innerWidth})
		}

		this.play()

	}

	show(){
		this.Graphene.visible = true
		this.Enemy.visible = true
		this.talkText.visible = true
		this.GrapheneText.visible = true
		this.EnemyText.visible = true
		if(this.paused == true){
			this.Play.visible = true
			this.Pause.visible = false
		}else{
			this.Play.visible = false
			this.Pause.visible = true

		}
			
		this.interval = setInterval(() => requestAnimationFrame(this.frame.bind(this)), 66.66)

		paper.view.onMouseDown = (e) => {
			if(e.event.button == 0){
				this.story.next()
			}
		}
		//paper.view.onFrame = 

		// this.Play.visible = false
		// this.Pause.visible = false
	}

	hide(){ // hide all the elements in the scene
		this.Graphene.visible = false
		this.Enemy.visible = false
		this.talkText.visible = false
		this.GrapheneText.visible = false
		this.EnemyText.visible = false
		this.Play.visible = false
		this.Pause.visible = false
		paper.view.onMouseDown = null // disable clicking on the screen
		paper.view.onFrame = null // disable animation

		clearInterval(this.interval)


		if(this.DialogueButtons != null){
			this.DialogueButtons.remove() 
		}


		// this.Play.visible = true
		// this.Pause.visible = true

	}

	destructor(){
		this.DialogueButtons.off()
		paper.view.onMouseDown = null // disable clicking on the screen

	}

	frame(){
		//this.Enemy.next()
		//this.Graphene.next()
	}

	position(width, height, center){
		this.talkText.point = new paper.Point(center.x, (center.y * 2) - 130)

		this.GrapheneText.position.x = this.Graphene.position.x = width - 150

		// this.Graphene.position.x = width - 500
		// this.GrapheneText.position.x = width - 200

		this.DialogueButtons.calculate({height, width})
		//= (center.y / 2) - 150
		// this.Graphene.position.y = this.Enemy.position.y  = (center.y / 2) - 150

		this.Graphene.position.y = this.Enemy.position.y = center.y - 100
		this.Enemy.position.x = 150 
		this.EnemyText.position.y = this.GrapheneText.position.y = center.y + 200

		this.Play.position.x = this.Pause.position.x = 50
		this.Play.position.y = this.Pause.position.y = height - 50

	}
}