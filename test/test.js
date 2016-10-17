var expect = require('chai').expect
var flexbox = require('../dist/cssobj-plugin-flexbox.cjs.js')
var _cssobj = require('cssobj-core')


var cssobj
describe('should get right CSS with flexbox', function() {
  beforeEach(function() {
    cssobj = _cssobj({
      plugins:[
        flexbox(),
        require('cssobj-plugin-gencss')(),
      ],
      onUpdate: result=>result.css = result.css.trim()
    })
  })

  it('display: flex', function() {
    var ret = cssobj({
      p: {display:'flex'}
    })

    expect(ret.css).equal(`p {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}`)
  })

  it('display: inline-flex', function() {
    var ret = cssobj({
      p: {display:'inline-flex'}
    })

    expect(ret.css).equal(`p {
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -moz-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
}`)
  })

  it('display: block', function() {
    var ret = cssobj({
      p: {display:'block'}
    })

    expect(ret.css).equal(`p {
  display: block;
}`)
  })

  it('flexDirection', function() {
    var ret = cssobj({
      p1: {flexDirection: 'row'},
      p2: {flexDirection: 'row-reverse'},
      p3: {flexDirection: 'column'},
      p4: {flexDirection: 'column-reverse'}
    })

    expect(ret.css).equal(`p1 {
  box-orient: horizontal;
  box-direction: normal;
  flex-direction: row;
}
p2 {
  box-orient: horizontal;
  box-direction: reverse;
  flex-direction: row-reverse;
}
p3 {
  box-orient: vertical;
  box-direction: normal;
  flex-direction: column;
}
p4 {
  box-orient: vertical;
  box-direction: reverse;
  flex-direction: column-reverse;
}`)
  })

})
