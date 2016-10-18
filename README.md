# cssobj-plugin-flexbox

[![Join the chat at https://gitter.im/css-in-js/cssobj](https://badges.gitter.im/css-in-js/cssobj.svg)](https://gitter.im/css-in-js/cssobj)  [![CircleCI](https://circleci.com/gh/cssobj/cssobj-plugin-flexbox.svg?style=svg)](https://circleci.com/gh/cssobj/cssobj-plugin-flexbox)  [![codecov](https://codecov.io/gh/cssobj/cssobj-plugin-flexbox/branch/master/graph/badge.svg)](https://codecov.io/gh/cssobj/cssobj-plugin-flexbox)

[cssobj](https://github.com/cssobj/cssobj) plugin for generate right flexbox CSS, input one line, give you right flexbox!

The lib using [autoprefixer](https://github.com/postcss/autoprefixer) as support tool, generate both [flexbox 2009 spec](https://www.w3.org/TR/2009/WD-css3-flexbox-20090723/) and [flexbox 2012 spec](http://www.w3.org/TR/css3-flexbox) result.

Currently hook below css props:

- **display**
- **flex-direction**
- **justify-content**
- **align-items**
- **order**
- **flex-grow**
- **flex-shrink**
- **flex-basis**
- **flex**
- **align-self**

For the transformed CSS, please look up the [test](https://github.com/cssobj/cssobj-plugin-flexbox/blob/master/test/test.js) result.

## Install

- npm

``` bash
npm install cssobj-plugin-flexbox
```

- bower

``` bash
bower install cssobj-plugin-flexbox
```

## Usage

``` javascript
var flexbox = require('cssobj-plugin-flexbox')

var cssobj(
  {
    div: {
      display: 'flex',
      alignItems: 'flex-end',
      border: none;
    }
  },
  {
    plugins: [flexbox()]
  }
)
```

result css:

``` css
div {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: end;
  -webkit-box-align: end;
  -moz-box-align: end;
  align-items: flex-end;
  border: none;
}
```

## Option

### option.define [object]

Redefine any css property, as value function that return an object, to replace the original property.

**Example:**

``` javascript
var cssobj(
  {
    div: {
      display: 'flex',
      alignItems: 'end',
      border: none;
    }
  },
  {
    plugins: [flexbox({
      // below redefine alignItems, and add new border replacement.
      define:{
        alignItems: function(value){ return {align: 'flex-'+value} },
        border: function(value){ return {color:value} }
      }
    })]
  }
)

```

result css:

```css
div {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align: flex-end;
  color: none;
}
```

Also, please take a look at [cssobj-plugin-replace](https://github.com/cssobj/cssobj-plugin-replace)

