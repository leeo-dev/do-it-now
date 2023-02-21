class NotFoundError extends Error {
  constructor(entity) {
    const message = `Sorry, we could not find the ${entity} you were looking for. Please check the ${entity} ID and try again.`;
    super(message);
    this.name = 'NotFoundError';
    this.entity = entity;
  }
}

module.exports = { NotFoundError };
