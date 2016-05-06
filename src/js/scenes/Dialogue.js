import paper from "paper"
import R from "ramda"

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
			button.setBounds(this.calculateButtonSize(text.bounds))

			group.addChild(button)
			group.addChild(text)

			this.width += group.getBounds().width

			return group
		})
	}

	calculateButtonSize(rect){
		let res_rect = R.clone(rect)
		let margin = 10
		res_rect.x -= margin/2
		res_rect.y -= margin/2
		res_rect.width += margin
		res_rect.height += margin

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
		this.talkText = new paper.PointText({
			point: paper.view.center,
		//	content: choices.who +": "+ choices.say,
			fillColor: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: font_size,
			justification: "center"
		})

		this.talkText.importSVG("./img/button.svg", e => {
			this.hiddenSampleButton = e
			this.hiddenSampleButton.visible = false

			this.DialogueButtons = new DialogueButtons(font_size, this.hiddenSampleButton)

			this.DialogueButtons.onSelect(n => {
				this.story.next(n)
			})

		})

		this.Graphene = new paper.Raster("./img/Graphene.png")
		this.Graphene.scale(-1,1)

		this.Enemy = new paper.Raster("./img/Carbon1.png")
		this.Enemy.scale(0.8,0.8)
		this.Graphene.scale(0.8,0.8)

		this.Enemy.position.x = 100

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
	
		this.EnemyText.position.x = 100
	
	}

	dialogue(line, choices){
		if(choices == null){
			this.DialogueButtons.remove()

			this.talkText.content = line.who +": "+ line.say

			paper.view.onMouseDown = () => {
				this.story.next()
			}

		}else{

			paper.view.onMouseDown = null // disable clicking on the screen

			this.DialogueButtons.create(choices)
			this.DialogueButtons.calculate({height: window.innerHeight, width: window.innerWidth})
		}
	}

	show(){
		this.Graphene.visible = true
		this.Enemy.visible = true
		this.talkText.visible = true
		this.GrapheneText.visible = true
		this.EnemyText.visible = true
		paper.view.onMouseDown = () => {
			this.story.next()
		}
	}

	hide(){
		this.Graphene.visible = false
		this.Enemy.visible = false
		this.talkText.visible = false
		this.GrapheneText.visible = false
		this.EnemyText.visible = false
		paper.view.onMouseDown = null // disable clicking on the screen


	}

	destructor(){
		this.DialogueButtons.off()
		paper.view.onMouseDown = null // disable clicking on the screen

	}

	position(width, height, center){
		this.talkText.point = new paper.Point(center.x, (center.y * 2) - 100)

		this.GrapheneText.position.x = this.Graphene.position.x = width - 100

		this.DialogueButtons.calculate({height, width})

		this.Graphene.position.y = this.Enemy.position.y = center.y - 100

		this.EnemyText.position.y = this.GrapheneText.position.y = center.y + 200
	}
}