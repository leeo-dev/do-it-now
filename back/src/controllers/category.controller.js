const {
  serverError,
  badRequest,
  ok,
  notFound,
} = require('../helpers/http.helper.js');
const CategoryService = require('../services/category.service.js');
const { prisma } = require('../helpers/prisma.init.js');
const { Validator } = require('../validators/validators.js');
const categoryService = new CategoryService({ category: prisma.category });
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
      return ok({ content: category, response });
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async findAll(request, response) {
    try {
      const all = await categoryService.findAll();
      ok({ content: all, response });
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const isDeleted = await categoryService.delete({ id });
      if (!isDeleted) return notFound({ entity: 'Category', response });
      noContent({ response });
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async findTodosById(request, response) {
    try {
      const { id } = request.params;
      const todos = await categoryService.findTodosById({ id });
      if (!todos) return notFound({ entity: 'Category', response });
      return ok({ content: todos, response });
    } catch (error) {
      return serverError({ error, response });
    }
  }
}
module.exports = new CategoryController();
