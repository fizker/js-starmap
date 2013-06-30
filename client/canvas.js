(function() {
	var canvas = new fabric.StaticCanvas($$('canvas')[0])
	var viewport =
	{ x: -canvas.width/2
	, y: -canvas.height/2
	, h: canvas.height
	, w: canvas.width
	}

	$$('.js-data-form')
		.on('submit', function(event) {
			var form = event.target
			event.preventDefault()
			var data = $('[name=data]', form)[0].value
			localStorage.setItem('map-data', data)
			render()
		})
		.find('textarea')[0].value = localStorage.getItem('map-data') || ''

	render()

	function render() {
		canvas.clear()
		var data = localStorage.getItem('map-data')
		if(!data) {
			return
		}

		// Assumption: data is valid
		data = JSON.parse(data)

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
