// cssobj intro flexbox

function displayFlex() {
  return {
    display: [
      '-webkit-box',
      '-webkit-flex',
      '-moz-box',
      '-ms-flexbox',
      'flex'
    ],
    '-ms-flex-preferred-size': 'initial'
  }
}

function displayInlineFlex() {
  return {
    display: [
      '-webkit-inline-box',
      '-webkit-inline-flex',
      '-moz-inline-box',
      '-ms-inline-flexbox',
      'inline-flex'
    ],
    // IE 10
    '-ms-flex-preferred-size': 'initial'
  }
}

function direction(val) {

  let getVal = value => {
    let valArr = value.split('-')
    return {
      boxOrient: valArr[0]=='row' ? 'horizontal' : 'vertical',
      boxDirection: valArr[1]=='reverse' ? 'reverse' : 'normal',
      flexDirection: value
    }
  }

  return getVal(val)
}

function justifyContent(val) {
  let valueDict = {
    'flex-start': {
      '-ms-flex-pack': 'start',
      boxPack: 'start',
      justifyContent: 'flex-start'
    },
    'flex-end':{
      '-ms-flex-pack': 'end',
      boxPack: 'end',
      justifyContent: 'flex-end'
    },
    'center':{
      '-ms-flex-pack': 'center',
      boxPack: 'center',
      justifyContent: 'center'
    },
    'space-between': {
      '-ms-flex-pack': 'justify',
      boxPack: 'justify',
      justifyContent: 'space-between'
    },
    'space-around': {
      '-ms-flex-pack': 'distribute',
      justifyContent: 'space-around'
    }
  }

  return valueDict[val] || {
    '-ms-flex-pack': val,
    boxPack: val,
    justifyContent: val
  }
}

function alignItems(val) {
  let valueDict = {
    'flex-start': {
      '-ms-flex-align': 'start',
      boxAlign: 'start',
      alignItems: 'flex-start'
    },
    'flex-end': {
      '-ms-flex-align': 'end',
      boxAlign: 'end',
      alignItems: 'flex-end'
    }
  }

  return valueDict[val] || {
    '-ms-flex-align': val,
    boxAlign: val,
    alignItems: val
  }
}

function order(val) {
  // ensure it's number type
  let oldForm = isNaN(val) ? val : val + 1
  return {
    '-ms-flex-order': val,
    boxOrdinalGroup: oldForm,
    order: val
  }
}

function flexGrow(val) {
  return {
    '-ms-flex-positive': val,
    boxFlex: val,
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
  let oldForm = parseInt(val, 10) | 0
  return {
    boxFlex: oldForm,
    flex: val
  }
}

function alignSelf(val) {

  let valueDict = {
    'start': {
      '-ms-flex-item-align': 'start',
      alignSelf: 'flex-start'
    },
    'end': {
      '-ms-flex-item-align': 'start',
      alignSelf: 'flex-start'
    },
    'center': {
      '-ms-flex-item-align': 'center',
      '-ms-grid-row-align': 'center',
      alignSelf: 'center'
    },
    'baseline': {
      '-ms-flex-item-align': 'baseline',
      alignSelf: 'baseline'
    },
    'stretch': {
      '-ms-flex-item-align': 'stretch',
      '-ms-grid-row-align': 'stretch',
      alignSelf: 'stretch'
    }
  }

  return valueDict[val] || {
    '-ms-flex-item-align': val,
    msGridRowAlign: val,
    alignSelf: val
  }
}

function cssobj_intro_flexbox (option) {
  option = option || {}
}

export default cssobj_intro_flexbox
