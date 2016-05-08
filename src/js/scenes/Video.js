import paper from "paper"

export default class VideoScene {
	constructor(story){
		this.Skip = new paper.Raster("./img/skip.png")
		this.Skip.scale(0.2, 0.2)

		this.hide()

		this.Skip.opacity = 0.3


		this.Skip.onMouseEnter = () => this.Skip.opacity = 0.8
		this.Skip.onMouseLeave = () => this.Skip.opacity = 0.3
		this.Skip.onClick = () => story.next()

	}

	position(width, height /*, center*/ ){
		this.Skip.position.x = width - 80
		this.Skip.position.y = height - 80
	}

	hide(){
		this.Skip.visible = false
		
	}

	show(){
		this.Skip.visible = true
	}

	destructor(){
		this.Skip.remove()

		this.Skip.onMouseEnter = null
		this.Skip.onMouseLeave = null
		this.Skip.onClick = null
	}
}