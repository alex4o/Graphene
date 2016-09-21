import paper from "paper"
import rasterLoad from "../util/rasterLoad"


export default class EndScene {
	constructor(){
		this.Graphene = new paper.Raster("./img/Graphene.png")
		this.Graphene.scale(-1,1)


		this.Graphene.visible = true

		this.Graphene.onClick = () => {
			window.location = window.location.pathname.replace("game","index") + "#end"

			//window.location.pathname = window.location.pathname.replace("game","index")
		}

		this.talkText = new paper.PointText({
			point: paper.view.center,
		//	content: choices.who +": "+ choices.say,
			fillColor: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: 21,
			justification: "center"
		})

		this.talkText.visible = true


		this.Graphene.setPosition(paper.view.center)
		this.talkText.content = "А ти какво научи от всичко това?"	
	}

	position(width, height, center){
		this.Graphene.setPosition(center)
		this.talkText.point = new paper.Point(center.x, (center.y * 2) - 130)

	}

	hide(){
		this.Graphene.visible = false
		this.talkText.visible = false
	}

	show(){
		this.Graphene.visible = true
		this.talkText.visible = true
	}

	destructor(story){
		
	}

	assetsLoaded(){
		return Promise.all([this.Graphene].map(rasterLoad))
	}
}