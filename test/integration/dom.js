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
