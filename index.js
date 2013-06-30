var PORT = process.env.PORT || 8080
var fs = require('fs')
var express = require('express')
var app = express()

app.use(express.static('./client'))
app.use(express.static('./lib'))
app.get('/', function(req, res) {
	fs.readFile('./client/index.html', 'utf8', function(err, html) {
		res.send(html)
	})
})
app.listen(PORT, function() {
	console.log('App running at ' + PORT)
})
