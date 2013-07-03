describe('integration/dom.js', function() {
	beforeEach(function() {
		fzkes.fake(document, 'querySelectorAll').callsOriginal()
	})
	afterEach(function() {
		fzkes.restore()
	})

	describe('When calling `$()`', function() {
		describe('with no scope', function() {
			var result
			beforeEach(function() {
				result = $('.element')
			})
			it('calls `querySelectorAll` on `document`', function() {
				expect(document.querySelectorAll).to.have.been.called
			})
			it('returns an extended array', function() {
				expect(result).to.be.an('array')
					.and.have.property('_extended', true)
			})
		})
	})

	describe('When calling extend method', function() {
		var list
		beforeEach(function() {
			list = $.create('<div></div><div></div>')
		})
		describe('on()', function() {
			var $result
			beforeEach(function() {
				fzkes.fake(list[0], 'addEventListener')
				fzkes.fake(list[1], 'addEventListener')

				$result = list.on('click', function() {})
			})
			it('should add the specified event', function() {
				expect(list[0].addEventListener).to.have.been.called
				expect(list[1].addEventListener).to.have.been.called
			})
			it('should return the original list', function() {
				expect($result).to.equal(list)
			})
		})
		describe('off()', function() {
			var $result
			var handlers
			beforeEach(function() {
				handlers = { first: function() {}, second: function() {} }
				fzkes.fake(list[0], 'removeEventListener')
				fzkes.fake(list[1], 'removeEventListener')
				list
					.on('click', handlers.first)
					.on('click', handlers.second)
			})
			describe('with event and function', function() {
				beforeEach(function() {
					$result = list.off('click', handlers.first)
				})
				it('removes that handler', function() {
					list.forEach(function(el) {
						expect(el.removeEventListener)
							.to.have.been.calledWith('click', handlers.first)
					})
				})
				it('does not remove the other handler', function() {
					list.forEach(function(el) {
						expect(el.removeEventListener)
							.not.to.have.been.calledWith('click', handlers.second)
					})
				})
				it('returns the list itself', function() {
					expect($result).to.equal(list)
				})
			})
		})
		describe('once()', function() {
			var $result
			var handler
			beforeEach(function() {
				handler = fzkes.fake('handler')
				list.forEach(function(el) {
					fzkes.fake(el, 'addEventListener')
					fzkes.fake(el, 'removeEventListener')
				})
				$result = list.once('click', handler)
			})
			it('should add the listener', function() {
				list.forEach(function(el) {
					expect(el.addEventListener)
						.to.have.been.calledWith('click')
				})
			})
			it('should remove the listener from all elements when it gets called', function() {
				var handler = list[0].addEventListener._calls[0][1]
				list[0].addEventListener.callsArg({ now: true })
				list.forEach(function(el) {
					expect(el.removeEventListener)
						.to.have.been.calledWith('click', handler)
				})
			})
			it('should call the handler', function() {
				var event = {}
				list[0].addEventListener.callsArg({ now: true, arguments: [ event ] })
				expect(handler).to.have.been.calledWithExactly(event)
			})
			it('should return the list', function() {
				expect($result).to.equal(list)
			})
		})

		describe('find()', function() {
			beforeEach(function() {
				list = $.create('<div class="lvl1"><div class="lvl2 primary"></div></div>\
<div class="lvl1"><div class="lvl2"></div></div>')
			})
			it('should return a new list of matching elements', function() {
				list = list.find('.primary')
				expect(list).to.have.length(1)
			})
		})

		describe('appendTo()', function() {
			var $list
			var $result
			var element
			beforeEach(function() {
				element = document.createElement('div')
				$list = $.create('<div></div><div></div>')
				$result = $list.appendTo(element)
			})
			it('should have all elements appended', function() {
				expect(element.children).to.have.length(2)
			})
			it('should return the original list', function() {
				expect($result).to.equal($list)
			})
		})
		describe('append()', function() {
			var $elm
			var $result
			beforeEach(function() {
				$elm = $.create('<div></div>')
			})
			describe('with an element', function() {
				var span
				beforeEach(function() {
					span = document.createElement('span')
					$result = $elm.append(span)
				})
				it('should append that element', function() {
					expect($elm[0].children[0]).to.equal(span)
				})
				it('should return the original element', function() {
					expect($result).to.equal($elm)
				})
			})
			describe('with an extended list', function() {
				var $list
				beforeEach(function() {
					$list = $.create('<span class="first"></span><span class="second"></span>')
					$result = $elm.append($list)
				})
				it('should append all elements', function() {
					expect($elm[0].children).to.have.length(2)
				})
				it('should return the original element', function() {
					expect($result).to.equal($elm)
				})
			})
			describe('with a string', function() {
				beforeEach(function() {
					$result = $elm.append('<span></span>')
				})
				it('should evaluate and append the result', function() {
					expect($elm[0].children).to.have.length(1)
				})
				it('should return the original element', function() {
					expect($result).to.equal($elm)
				})
			})
			describe('on multiple elements', function() {
				var $elms
				beforeEach(function() {
					$elms = $.create('<div class="first"></div><div class"second"></div>')
				})
				describe('with a string', function() {
					beforeEach(function() {
						$result = $elms.append('<span></span>')
					})
					it('should append to all elements', function() {
						expect($elms[0].children).to.have.length(1)
						expect($elms[1].children).to.have.length(1)
					})
					it('should return the original element', function() {
						expect($result).to.equal($elms)
					})
				})
				describe('with existing elements', function() {
					beforeEach(function() {
						var elm = $.create('<span></span>')
						$result = $elms.append(elm)
					})
					it('should only append to the first element', function() {
						expect($elms[0].children).to.have.length(1)
						expect($elms[1].children).to.have.length(0)
					})
					it('should return the original element', function() {
						expect($result).to.equal($elms)
					})
				})
			})
		})
	})

	describe('When calling `$.create()`', function() {
		var elments
		describe('with a single element', function() {
			beforeEach(function() {
				elements = $.create('<div></div>')
			})
			it('should return a list', function() {
				expect(elements).to.be.an('array')
					.and.have.length(1)
			})
			it('should contain the element', function() {
				expect(elements[0]).to.have.property('nodeName', 'DIV')
			})
			it('should be extended', function() {
				elements.should.have.property('_extended', true)
			})
		})
		describe('with multiple elements', function() {
			beforeEach(function() {
				elements = $.create('<div id="first"></div><div id="second"></div>')
			})
			it('should return an extended list', function() {
				expect(elements).to.be.an('array')
					.and.have.length(2)
					.and.have.property('_extended', true)
			})
			it('should contain the correct divs', function() {
				expect(elements[0]).to.have.property('id', 'first')
				expect(elements[1]).to.have.property('id', 'second')
			})
		})
	})
})
