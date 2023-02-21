const TodoRepository = require('../repository/todo.repository.js');
const Todo = require('../entities/todo.entity.js');

class TodoService {
  constructor({ todo }) {
    this.todoRepository = new TodoRepository({ todo });
  }

  async create({ text, categoryId }) {
    const newTodo = new Todo({ text, categoryId });
    const todo = await this.todoRepository.create(newTodo);
    return todo;
  }

  async findAll() {
    const all = await this.todoRepository.findAll();
    return all;
  }

  async findById({ id }) {
    const todo = await this.todoRepository.findById({ id });
    return todo;
  }

  async delete({ id }) {
    const todoExists = await this.findById({ id });
    if (!todoExists) return false;
    await this.todoRepository.delete({ id });
    return true;
  }

  async update({ id, data }) {
    const todoExists = await this.findById({ id });
    if (!todoExists) return false;
    const updatedTodo = await this.todoRepository.update({ id, data });
    return updatedTodo;
  }

  async complete({ id }) {
    const todoExists = await this.findById({ id });
    if (!todoExists) return false;
    await this.todoRepository.complete({ id });
    return true;
  }

  async uncomplete({ id }) {
    const todoExists = await this.findById({ id });
    if (!todoExists) return false;
    await this.todoRepository.uncomplete({ id });
    return true;
  }
}

module.exports = TodoService;
