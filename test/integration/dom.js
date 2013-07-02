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
			var list
			var element
			beforeEach(function() {
				element = document.createElement('div')
				$.create('<div></div><div></div>').appendTo(element)
			})
			it('should have all elements appended', function() {
				expect(element.children).to.have.length(2)
			})
		})
		describe('append()', function() {
			var $elm
			beforeEach(function() {
				$elm = $.create('<div></div>')
			})
			describe('with an element', function() {
				var span
				beforeEach(function() {
					span = document.createElement('span')
					$elm.append(span)
				})
				it('should append that element', function() {
					expect($elm[0].children[0]).to.equal(span)
				})
			})
			describe('with an extended list', function() {
				var $list
				beforeEach(function() {
					$list = $.create('<span class="first"></span><span class="second"></span>')
					$elm.append($list)
				})
				it('should append all elements', function() {
					expect($elm[0].children).to.have.length(2)
				})
			})
			describe('with a string', function() {
				beforeEach(function() {
					$elm.append('<span></span>')
				})
				it('should evaluate and append the result', function() {
					expect($elm[0].children).to.have.length(1)
				})
			})
			describe('on multiple elements', function() {
				var $elms
				beforeEach(function() {
					$elms = $.create('<div class="first"></div><div class"second"></div>')
				})
				describe('with a string', function() {
					beforeEach(function() {
						$elms.append('<span></span>')
					})
					it('should append to all elements', function() {
						expect($elms[0].children).to.have.length(1)
						expect($elms[1].children).to.have.length(1)
					})
				})
				describe('with existing elements', function() {
					beforeEach(function() {
						var elm = $.create('<span></span>')
						$elms.append(elm)
					})
					it('should only append to the first element', function() {
						expect($elms[0].children).to.have.length(1)
						expect($elms[1].children).to.have.length(0)
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
