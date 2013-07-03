describe('integration/starmap.js', function() {
	describe('When calling `render()`', function() {
		var starmap
		beforeEach(function() {
			var canvas = document.createElement('canvas')
			starmap = new Starmap(canvas)
		})
		describe('with no parameters', function() {
			it('should not throw', function() {
				expect(function() {
					starmap.render()
				}).not.to.throw()
			})
		})
		describe('with `null`', function() {
			it('should not throw', function() {
				expect(function() {
					starmap.render(null)
				}).not.to.throw()
			})
		})
		describe('with an empty star list', function() {
			it('should not throw', function() {
				expect(function() {
					starmap.render({ stars: [] })
				}).not.to.throw()
			})
		})
		describe('with two stars', function() {
			it('should not throw', function() {
				expect(function() {
					starmap.render(
						{ stars:
						  [ { x: 1
						    , y: 1
						    , name: 'a'
						    }
						  , { x: 2
						    , y: 2
						    , name: 'b'
						    }
						  ]
						})
				}).not.to.throw()
			})
		})
	})
	describe('When creating a starmap', function() {
		describe('with a `canvas` element', function() {
			it('should return a new instance', function() {
				var canvas = document.createElement('canvas')
				var starmap = new Starmap(canvas)
				expect(starmap).to.be.an.instanceof(Starmap)
			})
		})
		describe('without any parameters', function() {
			it('should throw a TypeError', function() {
				expect(function() {
					new Starmap
				}).to.throw(TypeError)
			})
		})
		describe('without a canvas', function() {
			it('should throw a TypeError', function() {
				expect(function() {
					new Starmap({})
				}).to.throw(TypeError)
			})
		})
	})
})
