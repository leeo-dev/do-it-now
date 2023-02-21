const { serverError, badRequest, ok } = require('../helpers/http.helper.js');
const { CategoryService } = require('../services/category.service.js');
const categoryService = new CategoryService({ category: prisma.todo });
class CategoryController {
  async create(request, response) {
    try {
      const error = Validator.checkRequiredFields({
        requiredFields: ['name'],
        body: request.body,
      });
      if (error) return badRequest({ error, response });
      const { name } = request.body;
      const category = await categoryService.create({ name });
      return ok({ category, response });
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async findAll(request, response) {
    try {
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async delete(request, response) {
    try {
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async findTodosById(request, response) {
    try {
    } catch (error) {
      return serverError({ error, response });
    }
  }
}
module.exports = new CategoryController();
