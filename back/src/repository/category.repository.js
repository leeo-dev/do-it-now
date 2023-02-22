class CategoryRepository {
  constructor({ category }) {
    this.category = category;
  }
  async create({ name }) {
    const category = await this.category.create({
      data: { name },
      include: { todos: true },
    });
    return category;
  }

  async findAll() {
    const all = await this.category.findMany();
    return all;
  }

  async delete({ id }) {
    await this.category.delete({ where: { id } });
  }

  async findById({ id }) {
    const category = await this.category.findUnique({
      where: { id },
    });

    return category;
  }

  async findTodosById({ id }) {
    const category = await this.category.findUnique({
      where: { id },
      include: { todos: true },
    });

    return category;
  }
}

module.exports = { CategoryRepository };
