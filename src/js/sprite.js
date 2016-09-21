import paper from "paper"

let Sprite = paper.Group.extend({
	_class: 'Sprite',
	initialize: function Sprite(url, size, portion) {
		this.maskSize = size || new paper.Size(256, 256)
		this.portion = portion
		var that = this

		if (portion) {
			this._spriteSheetWidth = portion.width / that.maskSize.width
			this._spriteSheetHeight = portion.height / that.maskSize.height
		}

		this._raster = new paper.Raster(url)
		this._raster.pivot = new paper.Point()
		this._raster.on("load", function() {
			if (!portion) {
				this.pivot = this.bounds.topLeft
				that._spriteSheetWidth = this.size.width / that.maskSize.width
				that._spriteSheetHeight = this.size.height / that.maskSize.height
			} else {
				this.pivot = this.bounds.topLeft.add(portion.topLeft)
			}
			that.setIndex(that._spriteIndex || 0)
		})
		this._clipRect = new paper.Path.Rectangle(new paper.Point(), this.maskSize)

		Sprite.base.call(this, [this._clipRect, this._raster])
		// Just use a blank point if you want the position to be in the corner
		this.pivot = new paper.Point()
		this.applyMatrix = false
		// this.pivot = new paper.Point(this.maskSize.divide(2)) 

		this.clipped = true
	},

	setIndex: function(index) {
		if (typeof this._spriteSheetWidth !== "undefined") {
			let column = index % this._spriteSheetWidth
			let row = (index - column) / this._spriteSheetWidth

			this._raster.position = new paper.Point(-column * this.maskSize.width, -row * this.maskSize.height)
		}
		return this._spriteIndex = index
	},

	getIndex: function() {
		return this._spriteIndex
	},

	maxIndex: function() {
		if (typeof this._spriteSheetWidth !== "undefined") {
			return (this._spriteSheetWidth * this._spriteSheetHeight) - 1
		}
		return null
	},
	next: function() {
		var i = this._spriteIndex + 1
		if (i > this.maxIndex()) {
			return this.setIndex(0)
		}
		return this.setIndex(i)
	}
})

export default Sprite