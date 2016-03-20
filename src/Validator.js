function Validator(name, message, validationFunc) {
  this.name = name;
  if(typeof message === 'function') {
    this.validationFunc = message;
  } else if(typeof message === 'string') {
    this.invalidMessage = message;
    this.validationFunc = validationFunc;
  }
}

Validator.prototype.setInvalidMessage = function (invalidMessage) {
  if(invalidMessage === null) {
    this.invalidMessage = null;
    return;
  }

  if(typeof invalidMessage === 'string') {
    this.invalidMessage = invalidMessage;
  }
}

Validator.prototype.validateProp = function (prop, values) {
  if(!Array.isArray(values)) {
    return this.validationFunc(prop, value);
  }

  var argumentsArr = values.slice();
  argumentsArr.unshift(prop);
  return this.validationFunc.apply(this, argumentsArr);
}

Validator.prototype.validatePropToObj = function(prop, values, message) {
  var validated;
  if(!Array.isArray(values)) {
    var validated = !!this.validationFunc(prop, values);
  } else {
    var argumentsArr = values.slice();
    argumentsArr.unshift(prop);
    validated = this.validationFunc.apply(this, argumentsArr);
  }
  
  var obj = {name: this.name, passed: validated};
  if(!validated) {
    if(message && typeof message === 'string') {
      obj.message = message;
    } else if(this.invalidMessage) {
      obj.message = this.invalidMessage;
    } 
  }
  return obj;
}

module.exports = Validator;