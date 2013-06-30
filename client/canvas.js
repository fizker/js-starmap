$$('.js-data-form')
	.on('submit', function(event) {
		var form = event.target
		event.preventDefault()
		var data = $('[name=data]', form)[0].value
		localStorage.setItem('map-data', data)
	})
	.find('textarea')[0].value = localStorage.getItem('map-data') || ''
