const { prisma } = require('../helpers/prisma.init.js');
class TodoRepository {
  constructor({ todo }) {
    this.todo = todo;
  }

  async create({ text, categoryId }) {
    const todo = await prisma.todo.create({
      data: {
        text,
        categoryId,
      },
    });

    return todo;
  }

  async findAll() {
    const all = await this.todo.findMany();
    return all;
  }

  async find(id) {
    const todo = await this.todo.findUnique({ where: { id } });
    return todo;
  }
}

module.exports = TodoRepository;
