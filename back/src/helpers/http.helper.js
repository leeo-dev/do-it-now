const { NotFoundError } = require('../errors/not-found-error');
const { ServerError } = require('../errors/server-error');

const badRequest = ({ error, response }) => {
  return response
    .status(400)
    .json({ error: { message: error.message, field: error.field } });
};

const notFound = ({ entity, response }) => {
  const { message } = new NotFoundError(entity);
  return response.status(404).json({ error: { message } });
};

const noContent = ({ response }) => {
  return response.status(204).json();
};

const ok = ({ content, response }) => {
  return response.status(200).json(content);
};

const serverError = ({ error, response }) => {
  const { message, stack } = new ServerError(String(error.stack));
  return response.status(500).json({ message, stack });
};

module.exports = { badRequest, serverError, notFound, noContent, ok };
