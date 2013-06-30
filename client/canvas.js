var Starmap = (function() {
	function ctor(canvas) {
		this._canvas = new fabric.StaticCanvas(canvas)

		this._viewport =
		{ x: -canvas.width/2
		, y: -canvas.height/2
		, h: canvas.height
		, w: canvas.width
		}
	}

	ctor.prototype =
	{ render: render
	}

	return ctor

	function render(data) {
		var viewport = this._viewport
		var canvas = this._canvas
		canvas.clear()

		if(!data) {
			return
		}

		data.stars.forEach(function(star) {
			var circle = new fabric.Circle({
				  top: star.y - viewport.y
				, left: star.x - viewport.x
				, fill: star.color || 'white'
				, radius: 3
				})
			var name = new fabric.Text(star.name, {
				  fill: 'white'
				, top: star.y - viewport.y + 10
				, left: star.x - viewport.x
				, fontSize: 12
			})

			canvas.add(circle)
			canvas.add(name)
		})
	}
})()
