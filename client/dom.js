var $ = (function() {
	var slice = Array.prototype.slice
	var concat = Array.prototype.concat
	return function $(elements, scope) {
		if(typeof(elements) == 'string') {
			elements = (scope || document).querySelectorAll(elements)
			elements = slice.call(elements)
		}
		if(!elements) {
			elements = []
		}
		if(!Array.isArray(elements)) {
			elements = [ elements ]
		}
		return extend(elements)
	}

	function extend(arr) {
		arr.on = function(event, fn) {
			this.forEach(function(el) {
				el.addEventListener(event, fn)
			})
			return this
		}
		arr.find = function(sel) {
			return concat.apply([], this.map(function(el) {
				return $(sel, el)
			}))
		}
		return arr
	}
})()
function $$(sel, scope) {
	var element = (scope || document).querySelector(sel)
	return $(element)
}
