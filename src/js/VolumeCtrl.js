import paper from "paper"

const vol_ctrl_width = 60

export default class VolumeCtrl {
	constructor(volume){
		this.size = {
			x: 20,
			y: 20,
			w: vol_ctrl_width,
			h: 3*vol_ctrl_width
		}
		let size = this.size

		this.path = {
			mw: 23, // margin width,x
			mh: 15 // margin height,y
		}
		let path = this.path


		this.root = new paper.Group()

		let rect_out_box = new paper.Rectangle(size.x,size.y, size.w, size.h)
		var box = new paper.Shape.Rectangle(rect_out_box)
		box.fillColor = "black"

		this.root.addChild(box)

		let rect_blue_path = new paper.Rectangle(size.x + path.mw, size.y + path.mh, size.w - (path.mw*2), (size.h - 20) - (path.mh*2))
		this.path_blue = new paper.Shape.Rectangle(rect_blue_path)
		this.path_blue.fillColor = "#000080"

		this.root.addChild(this.path_blue)


		var vol = ((volume * 100) | 0)


		let rect_white_path = new paper.Rectangle(size.x + path.mw, size.y + path.mh, size.w - (path.mw*2), (((size.h - 20) - (path.mh*2)) * (1 - volume)) | 0)
		this.path_white = new paper.Shape.Rectangle(rect_white_path)
		this.path_white.fillColor = "white"

		this.root.addChild(this.path_white)


		this.text = new paper.PointText({
			point: new paper.Point(size.x + (size.w/2), size.w + ((size.h - 25) - (path.mh*2))),
			content: vol + "%",
			fillColor: "white",
			fontFamily: "Verdana",
			fontWeight: "bold",
			fontSize: 13,
			justification: "center"
		})

		this.root.addChild(this.text) 

		this.root.visible = false

		window.vcg = this.root

		var black_line = new paper.Shape.Rectangle(new paper.Rectangle(size.x + path.mw, size.y + path.mh, size.w - (path.mw*2), 1))
		black_line.fillColor = "black"

		this.root.addChild(black_line) 

		paper.view.draw()

	}

	update(value){
		this.root.visible = true
		clearTimeout(this.timout)

		let vol = ((value * 100) | 0)
		let bounds = new paper.Rectangle(this.size.x + this.path.mw, this.size.y + this.path.mh, this.size.w - (this.path.mw*2), (((this.size.h - 20) - (this.path.mh*2)) * (1 - value)) | 0)

		if(bounds.height < 1) {
			bounds.height = 1
		}

		this.path_white.setBounds(bounds)
		this.text.content = vol + "%"
		paper.view.draw()

		this.timout = setTimeout(() => {
			this.root.visible = false
			paper.view.draw()
		}, 500)

	}

}
