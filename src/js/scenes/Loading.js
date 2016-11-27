import paper from "paper"


let strings = [
	"Зарежда се, моля изчакайте",
	"Зарежда се, моля изчакайте.",
	"Зарежда се, моля изчакайте..",
	"Зарежда се, моля изчакайте..."
]

function center(sprite) {
	sprite.anchor.set(sprite.width / 2, sprite.height / 2)
}

export default class LoadingScene {
	constructor(story, stage){
		this.stage = stage

		//let texture = PIXI.Texture.fromImage()

		this.Graphene = new PIXI.Sprite.fromImage('./img/2313-fs8.png')





		center(this.Graphene)

		this.Graphene.scale.set(0.6, 0.6)



		// let center = paper.view.center

		// this.Graphene = new paper.Raster("./img/2313.png")
		// this.Graphene.setPosition(center)
		// this.Graphene.scale(0.6, 0.6)

		this.loadingText =  new PIXI.Text(strings[0],
			{
				// point: new paper.Point(center.x - 160, (center.y * 2) - 120),
				content: strings[0],
				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 21
			})

		//center(this.loadingText)




		this.graphics = new PIXI.Graphics()
		this.graphics.beginFill(0x00AFEF)
		this.graphics.drawRect(0, 0, 100, 100)
		this.graphics.endFill()
		// 	point: [0, 0],
		// 	size: [paper.view.size.width, paper.view.size.height],
		// 	strokeColor: "white",
		// 	selected: true
		// })
		// this.backGround.sendToBack()
		// this.backGround.fillColor = "#00AFEF"

		// this.interval = setInterval(() => {
		// 	requestAnimationFrame(this.frame.bind(this))
		// }, 16)

		this.counter = 0
		this.string = 0

		stage.addChild(this.graphics)

		stage.addChild(this.Graphene)
		stage.addChild(this.loadingText)

	}

	position(width, height, center, old){
		let scale_x = width / old.width
		let scale_y = height / old.height
		//console.log(width, center)

		this.Graphene.position.x = width / 2
		this.Graphene.position.y = height / 2

		if(scale_x < 1 || scale_y < 1){
			//this.Graphene.scale.set(Math.min(scale_x, scale_y)) 
			//console.log("old:", old, scale_y, scale_x)


		}else{
			//this.Graphene.scale.set(Math.max(scale_x, scale_y)) 

		}

		this.loadingText.position.set(center.x - 180, (center.y * 2) - 140)
		this.graphics.width = width
		this.graphics.height = height
		


	}

	hide(){
		// this.Graphene.remove()
		// this.loadingText.remove()
		// this.backGround.remove()
		clearInterval(this.interval)
	}

	show(){

	}

	update(){
		this.Graphene.rotation += 0.02
		// this.Graphene.rotation += 3.14/3
		if(this.counter == 20){
			this.string += 1
			if(this.string == strings.length){
				this.string = 0
			}
			this.loadingText.text = strings[this.string]
			this.counter = 0
		}
		this.counter += 1
	}

	destructor(story){
		
	}

	assetsLoaded(){
		
	}
}