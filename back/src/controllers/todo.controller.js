const {
  badRequest,
  serverError,
  ok,
  notFound,
  noContent,
} = require('../helpers/http.helper.js');
const { prisma } = require('../helpers/prisma.init.js');
const { Validator } = require('../validators/validators.js');
const TodoService = require('../services/todo.service.js');
const todoService = new TodoService({ todo: prisma.todo });

class TodoController {
  async create(request, response) {
    try {
      const error = Validator.checkRequiredFields({
        requiredFields: ['text', 'categoryId'],
        body: request.body,
      });
      if (error) return badRequest({ error, response });
      const { text, categoryId } = request.body;
      const todo = await todoService.create({ text, categoryId });
      return ok({ content: todo, response });
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async findAll(request, response) {
    try {
      const all = await todoService.findAll();
      return ok({ content: all, response });
    } catch (error) {
      serverError({ error, response });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;
      const todo = await todoService.findById({ id });
      if (!todo) return notFound({ entity: 'Todo', response });
      return ok({ content: todo, response });
    } catch (error) {
      serverError({ error, response });
    }
  }

  async complete(request, response) {
    try {
      const { id } = request.params;
      const isCompleted = await todoService.complete({ id });
      if (!isCompleted) return notFound({ entity: 'Todo', response });
      ok({ content: isCompleted, response });
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async uncomplete(request, response) {
    try {
      const { id } = request.params;
      const isUncompleted = await todoService.uncomplete({ id });
      if (!isUncompleted) return notFound({ entity: 'Todo', response });
      ok({ content: isUncompleted, response });
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const todo = await todoService.findById({ id });
      if (!todo) return notFound({ entity: 'Todo', response });
    } catch (error) {
      return serverError({ error, response });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const isDeleted = await todoService.delete({ id });
      if (!isDeleted) return notFound({ entity: 'Todo', response });
      noContent({ response });
    } catch (error) {
      return serverError({ error, response });
    }
  }
}

module.exports = new TodoController();
