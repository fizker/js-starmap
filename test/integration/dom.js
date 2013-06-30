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
		})
	})
})
