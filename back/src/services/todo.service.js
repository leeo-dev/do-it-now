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

  async find(id) {
    const todo = await this.todoRepository.findUnique({ where: { id } });
    return todo;
  }
}

module.exports = TodoService;
