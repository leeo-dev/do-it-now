const { prisma } = require('../helpers/prisma.init');

class CategoryRepository {
  constructor({ category }) {
    this.category = category;
  }
  async create({ name }) {
    const category = await prisma.category.create({
      data: { name },
      include: { todos: true },
    });
    return category;
  }

  async findAll() {
    const all = await prisma.category.findMany();
    return all;
  }

  async delete({ id }) {
    await prisma.category.delete({ where: { id } });
  }

  async findTodosById({ id }) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { todos: true },
    });

    return category;
  }
}

module.exports = { CategoryRepository };
