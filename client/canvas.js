var Starmap = (function() {
	function ctor(canvas) {
		if(!(canvas instanceof HTMLCanvasElement)) {
			throw new TypeError('You must hand a canvas element')
		}
		this._canvas = new fabric.StaticCanvas(canvas)

		this._viewport =
		{ x: -canvas.width/2
		, y: -canvas.height/2
		, h: canvas.height
		, w: canvas.width
		}

		var viewport = this._viewport
		// drag handling
		$(canvas)
			.on('touchstart', function(event) {
				var drag = getDragHandler(this, event)
				$(window)
					.on('touchmove', drag)
					.once('touchend', function() {
						$(window).off('touchmove', drag)
					})
			}.bind(this))
			.on('mousedown', function(event) {
				var drag = getDragHandler(this, event)
				$(window)
					.on('mousemove', drag)
					.once('mouseup', function() {
						$(window).off('mousemove', drag)
					})
			}.bind(this))

		function getDragHandler(map, event) {
			event.preventDefault()
			var move = { x: event.pageX, y: event.pageY }
			function drag(event) {
				event.preventDefault()
				var dx = move.x - event.pageX
				var dy = move.y - event.pageY
				move.x = event.pageX
				move.y = event.pageY
				viewport.x += dx
				viewport.y += dy
				map.render(map.lastData)
			}
			return drag
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

		this.lastData = data
		if(!data) {
			return
		}

		if(!data.routes) {
			data.routes = []
		}

		var stars = data.stars.reduce(function(dict, star) {
			dict[star.name] = star
			return dict
		}, {})
		data.routes.forEach(function(route) {
			var from = stars[route.from]
			var to = stars[route.to]
			var line = new fabric.Line(
				  [ from.x - viewport.x
				  , from.y - viewport.y
				  , to.x - viewport.x
				  , to.y - viewport.y
				  ]
				, { stroke: route.color || 'white'
				  }
				)
			canvas.add(line)
		})

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
