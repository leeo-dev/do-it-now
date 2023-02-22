const { CategoryRepository } = require('../repository/category.repository');
const { Category } = require('../entities/category.entity.js');

class CategoryService {
  constructor({ category }) {
    this.categoryRepository = new CategoryRepository({ category });
  }

  async create({ name }) {
    const newCategory = new Category({ name });
    const category = await this.categoryRepository.create(newCategory);
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }

  async findById({ id }) {
    const todo = await this.categoryRepository.findById({ id });
    return todo;
  }

  async delete({ id }) {
    const categoryExists = await this.findById({ id });
    if (!categoryExists) return false;
    await this.categoryRepository.delete({ id });
    return true;
  }

  async findTodosById({ id }) {
    const category = await this.categoryRepository.findById({ id });
    if (!category) return false;
    const todos = await this.categoryRepository.findTodosById({ id });
    return todos;
  }
}

module.exports = CategoryService;
