class MissingParamError extends Error {
  constructor(paramName) {
    const message = `Oops! It looks like you forgot to fill in a required field. Please don't forget to include the ${paramName} field to proceed.`;
    super(message);
    this.name = 'MissingParamError';
    this.field = paramName;
  }
}

module.exports = { MissingParamError };
