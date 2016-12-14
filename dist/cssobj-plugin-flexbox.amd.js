define('cssobj_plugin_flexbox', function () { 'use strict';

// cssobj plugin flexbox

function display(val) {
  return val == 'flex'
    ? [
      '-webkit-box',
      '-webkit-flex',
      '-moz-box',
      '-ms-flexbox',
      'flex'
    ]
    : val == 'inline-flex'
    ? [
      '-webkit-inline-box',
      '-webkit-inline-flex',
      '-moz-inline-box',
      '-ms-inline-flexbox',
      'inline-flex'
    ]
    : val
}

function flexDirection(val) {

  var getVal = function (value) {
    var valArr = value.split('-');
    var orient = valArr[0]=='row' ? 'horizontal' : 'vertical';
    var direction = valArr[1]=='reverse' ? 'reverse' : 'normal';
    return {
      '-webkit-box-orient': orient,
      '-moz-box-orient': orient,
      '-webkit-box-direction': direction,
      '-moz-box-direction': direction,
      flexDirection: value
    }
  };

  return getVal(val+'')
}

function justifyContent(val) {
  var valueDict = {
    'flex-start': {
      '-ms-flex-pack': 'start',
      '-webkit-box-pack': 'start',
      '-moz-box-pack': 'start',
      justifyContent: 'flex-start'
    },
    'flex-end':{
      '-ms-flex-pack': 'end',
      '-webkit-box-pack': 'end',
      '-moz-box-pack': 'end',
      justifyContent: 'flex-end'
    },
    'center':{
      '-ms-flex-pack': 'center',
      '-webkit-box-pack': 'center',
      '-moz-box-pack': 'center',
      justifyContent: 'center'
    },
    'space-between': {
      '-ms-flex-pack': 'justify',
      '-webkit-box-pack': 'justify',
      '-moz-box-pack': 'justify',
      justifyContent: 'space-between'
    },
    'space-around': {
      '-ms-flex-pack': 'distribute',
      justifyContent: 'space-around'
    }
  };

  return valueDict[val] || {
    '-ms-flex-pack': val,
    '-webkit-box-pack': val,
    '-moz-box-pack': val,
    justifyContent: val
  }
}

function alignItems(val) {
  var valueDict = {
    'flex-start': {
      '-ms-flex-align': 'start',
      '-webkit-box-align': 'start',
      '-moz-box-align': 'start',
      alignItems: 'flex-start'
    },
    'flex-end': {
      '-ms-flex-align': 'end',
      '-webkit-box-align': 'end',
      '-moz-box-align': 'end',
      alignItems: 'flex-end'
    }
  };

  return valueDict[val] || {
    '-ms-flex-align': val,
    '-webkit-box-align': val,
    '-moz-box-align': val,
    alignItems: val
  }
}

function order(val) {
  // ensure it's number type
  var oldForm = isNaN(val) ? val : val + 1;
  return {
    '-ms-flex-order': val,
    '-webkit-box-ordinal-group': oldForm,
    '-moz-box-ordinal-group': oldForm,
    order: val
  }
}

function flexGrow(val) {
  return {
    '-ms-flex-positive': val,
    '-webkit-box-flex': val,
    '-moz-box-flex': val,
    flexGrow: val
  }
}

function flexShrink(val) {
  return {
    '-ms-flex-negative': val,
    flexShrink: val
  }
}

function flexBasis(val) {
  return {
    '-ms-flex-preferred-size': val,
    flexBasis: val
  }
}

function flex(val) {
  // ensure it's numeric type for 'none'
  var first = (val+'').split(' ').shift();
  var oldForm = first == 'auto'
      ? 1
      : first == 'none'
      ? 0
      : first;
  return {
    '-webkit-box-flex': oldForm,
    '-moz-box-flex': oldForm,
    '-ms-flex': val,
    flex: val
  }
}

function alignSelf(val) {

  var valueDict = {
    'flex-start': {
      '-ms-flex-item-align': 'start',
      alignSelf: 'flex-start'
    },
    'flex-end': {
      '-ms-flex-item-align': 'end',
      alignSelf: 'flex-end'
    },
    'baseline': {
      '-ms-flex-item-align': 'baseline',
      alignSelf: 'baseline'
    }
  };

  return valueDict[val] || {
    '-ms-flex-item-align': val,
    '-ms-grid-row-align': val,
    alignSelf: val
  }
}


var presetFlexBox = {
  display: display,
  flexDirection: flexDirection,
  justifyContent: justifyContent,
  alignItems: alignItems,
  order: order,
  flexGrow: flexGrow,
  flexShrink: flexShrink,
  flexBasis: flexBasis,
  flex: flex,
  alignSelf: alignSelf
};


function cssobj_plugin_flexbox (option) {
  if ( option === void 0 ) option={};


  var userDefined = option.define;

  return {
    value: function (value, key, node, result, propKey) {

      // prevent recursive loop with display: flex
      if(propKey!==void 0) { return value }

      var valueFunction = userDefined && userDefined[key] || presetFlexBox[key];

      return valueFunction
        ? valueFunction(value)
        : value
    }
  }
}

return cssobj_plugin_flexbox;

});
