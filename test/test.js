var expect = require('chai').expect
var flexbox = require('../dist/cssobj-plugin-flexbox.cjs.js')
var _cssobj = require('cssobj-core')


var cssobj
describe('test with option', function() {
  it('should work with empty option', function() {
    var plugin = flexbox()
    expect(plugin).not.null
  })

  it('should work with userDefined flexBox', function() {
    cssobj = _cssobj({
      plugins:[
        flexbox({
          define:{
            alignItems: function(val) {
              return {
                '-webkit-align-items': val,
                '-moz-align-items': val
              }
            }
          }
        }),
        require('cssobj-plugin-gencss')(),
      ]
    })

    var ret = cssobj({
      p: {
        display: 'flex',
        alignItems: 'center'
      }
    })

    expect(ret.css).equal(`p {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
}
`)

  })

})

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
      p: {display:'flex', width: 200}
    })

    expect(ret.css).equal(`p {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  width: 200;
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
      p4: {flexDirection: 'column-reverse'},
      p5: {flexDirection: 'auto'}
    })

    expect(ret.css).equal(`p1 {
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -webkit-box-direction: normal;
  -moz-box-direction: normal;
  flex-direction: row;
}
p2 {
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -moz-box-direction: reverse;
  flex-direction: row-reverse;
}
p3 {
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-box-direction: normal;
  -moz-box-direction: normal;
  flex-direction: column;
}
p4 {
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-box-direction: reverse;
  -moz-box-direction: reverse;
  flex-direction: column-reverse;
}
p5 {
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-box-direction: normal;
  -moz-box-direction: normal;
  flex-direction: auto;
}`)
  })

  it('justifyContent', function() {
    var ret = cssobj({
      p1: {
        justifyContent: 'flex-start'
      },
      p2: {
        justifyContent: 'flex-end'
      },
      p3: {
        justifyContent: 'center'
      },
      p4: {
        justifyContent: 'space-between'
      },
      p4: {
        justifyContent: 'space-around'
      },
      p5: {
        justifyContent: 'auto'
      }
    })

    expect(ret.css).equal(`p1 {
  -ms-flex-pack: start;
  -webkit-box-pack: start;
  -moz-box-pack: start;
  justify-content: flex-start;
}
p2 {
  -ms-flex-pack: end;
  -webkit-box-pack: end;
  -moz-box-pack: end;
  justify-content: flex-end;
}
p3 {
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  justify-content: center;
}
p4 {
  -ms-flex-pack: distribute;
  justify-content: space-around;
}
p5 {
  -ms-flex-pack: auto;
  -webkit-box-pack: auto;
  -moz-box-pack: auto;
  justify-content: auto;
}`)
  })

  it('alignItems', function() {
    var ret = cssobj({
      p1: {alignItems: 'flex-start'},
      p2: {alignItems: 'flex-end'},
      p3: {alignItems: 'center'},
      p4: {alignItems: 'baseline'},
      p5: {alignItems: 'auto'},
    })

    expect(ret.css).equal(`p1 {
  -ms-flex-align: start;
  -webkit-box-align: start;
  -moz-box-align: start;
  align-items: flex-start;
}
p2 {
  -ms-flex-align: end;
  -webkit-box-align: end;
  -moz-box-align: end;
  align-items: flex-end;
}
p3 {
  -ms-flex-align: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  align-items: center;
}
p4 {
  -ms-flex-align: baseline;
  -webkit-box-align: baseline;
  -moz-box-align: baseline;
  align-items: baseline;
}
p5 {
  -ms-flex-align: auto;
  -webkit-box-align: auto;
  -moz-box-align: auto;
  align-items: auto;
}`)
  })

  it('order', function() {
    var ret = cssobj({
      p1: {order: 0},
      p2: {order: 1},
      p3: {order: 'inherit'}
    })
    expect(ret.css).equal(`p1 {
  -ms-flex-order: 0;
  -webkit-box-ordinal-group: 1;
  -moz-box-ordinal-group: 1;
  order: 0;
}
p2 {
  -ms-flex-order: 1;
  -webkit-box-ordinal-group: 2;
  -moz-box-ordinal-group: 2;
  order: 1;
}
p3 {
  -ms-flex-order: inherit;
  -webkit-box-ordinal-group: inherit;
  -moz-box-ordinal-group: inherit;
  order: inherit;
}`)
  })

  it('flexGrow', function() {
    var ret = cssobj({
      p1: {flexGrow: 1},
      p2: {flexGrow: 'inherit'}
    })
    expect(ret.css).equal(`p1 {
  -ms-flex-positive: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex-grow: 1;
}
p2 {
  -ms-flex-positive: inherit;
  -webkit-box-flex: inherit;
  -moz-box-flex: inherit;
  flex-grow: inherit;
}`)
  })

  it('flexShrink', function() {
    var ret=cssobj({
      p1: {flexShrink: 1},
      p2: {flexShrink: 'inherit'},
    })
    expect(ret.css).equal(`p1 {
  -ms-flex-negative: 1;
  flex-shrink: 1;
}
p2 {
  -ms-flex-negative: inherit;
  flex-shrink: inherit;
}`)
  })

  it('flexBasis', function() {
    var ret=cssobj({
      p1: {flexBasis: '200px'},
      p2: {flexBasis: 'inherit'},
    })
    expect(ret.css).equal(`p1 {
  -ms-flex-preferred-size: 200px;
  flex-basis: 200px;
}
p2 {
  -ms-flex-preferred-size: inherit;
  flex-basis: inherit;
}`)
  })

  it('flex', function() {
    var ret=cssobj({
      p0: {flex: 1},
      p1: {flex: '1 1 auto'},
      p2: {flex: 'none'},
      p3: {flex: 'auto'},
      p4: {flex: 'auto auto auto'},
      p5: {flex: 'inherit inherit inherit'},
    })
    expect(ret.css).equal(`p0 {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
p1 {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}
p2 {
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  -ms-flex: none;
  flex: none;
}
p3 {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
}
p4 {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: auto auto auto;
  flex: auto auto auto;
}
p5 {
  -webkit-box-flex: inherit;
  -moz-box-flex: inherit;
  -ms-flex: inherit inherit inherit;
  flex: inherit inherit inherit;
}`)
  })

  it('alignSelf', function() {
    var ret = cssobj({
      p1: {alignSelf: 'flex-start'},
      p2: {alignSelf: 'flex-end'},
      p3: {alignSelf: 'center'},
      p4: {alignSelf: 'baseline'},
      p5: {alignSelf: 'stretch'},
    })
    expect(ret.css).equal(`p1 {
  -ms-flex-item-align: start;
  align-self: flex-start;
}
p2 {
  -ms-flex-item-align: end;
  align-self: flex-end;
}
p3 {
  -ms-flex-item-align: center;
  -ms-grid-row-align: center;
  align-self: center;
}
p4 {
  -ms-flex-item-align: baseline;
  align-self: baseline;
}
p5 {
  -ms-flex-item-align: stretch;
  -ms-grid-row-align: stretch;
  align-self: stretch;
}`)
  })

})
