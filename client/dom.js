var $ = (function() {
	var slice = Array.prototype.slice
	var concat = Array.prototype.concat
	var creator = document.createElement('div')

	function $(elements, scope) {
		if(typeof(elements) == 'string') {
			elements = (scope || document).querySelectorAll(elements)
			elements = slice.call(elements)
		}
		if(!elements) {
			elements = []
		}
		if(elements instanceof DocumentFragment) {
			elements = slice.call(elements.childNodes)
		}
		if(!Array.isArray(elements)) {
			elements = [ elements ]
		}
		return extend(elements)
	}
	$.create = createNode;
	return $;

	function createNode(str) {
		creator.innerHTML = str
		var elms = document.createDocumentFragment()
		while(creator.firstChild) {
			elms.appendChild(creator.firstChild)
		}
		return $(elms)
	}

	function extend(arr) {
		extend = function extend(arr) {
			if(arr._extended) {
				return arr
			}
			arr._extended = true
			arr.on = on
			arr.find = find
			return arr
		}
		return extend(arr)

		function find(sel) {
			return concat.apply([], this.map(function(el) {
				return $(sel, el)
			}))
		}
		function on(event, fn) {
			this.forEach(function(el) {
				el.addEventListener(event, fn)
			})
			return this
		}
	}
})()
function $$(sel, scope) {
	var element = (scope || document).querySelector(sel)
	return $(element)
}
