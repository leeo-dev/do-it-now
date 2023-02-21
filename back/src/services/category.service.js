const { CategoryRepository } = require('../repository/category.repository');

class CategoryService {
  constructor({ category }) {
    this.category = new CategoryRepository({ category });
  }

  async create({ name }) {
    const category = await this.category.create({ name });
    return category;
  }

  async findAll() {
    const categories = await this.category.findAll();
    return categories;
  }

  async delete({ id }) {
    await this.category.delete({ id });
  }

  async findTodosById({ id }) {
    const todos = await this.category.findTodosById({ id });
  }
}

module.exports = { CategoryService };
