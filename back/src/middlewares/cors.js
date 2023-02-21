const cors = (request, response, next) => {
  response.set('access-control-allow-origin', '*');
  response.set('access-control-allow-methods', '*');
  response.set('access-control-allow-headers', '*');
  next();
};
module.exports = { cors };
