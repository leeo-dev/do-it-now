const { MissingParamError } = require('../errors/missing-param-error');

class Validator {
  constructor() {}
  static checkRequiredFields({ requiredFields, body }) {
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in body)) {
        return new MissingParamError(field);
      }
    }
    return false;
  }
}

module.exports = { Validator };
