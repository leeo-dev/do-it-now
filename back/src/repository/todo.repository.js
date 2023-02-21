class TodoRepository {
  constructor({ todo }) {
    this.todo = todo;
  }

  async create({ text, categoryId }) {
    const todo = await this.todo.create({
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

  async findById({ id }) {
    const todo = await this.todo.findUnique({ where: { id: Number(id) } });
    return todo;
  }

  async update({ id, data }) {
    const updatedTodo = await this.todo.update({
      where: { id: Number(id) },
      data: { text: data.text },
    });
    return updatedTodo;
  }

  async complete({ id }) {
    const completedTodo = await this.todo.update({
      where: { id: Number(id) },
      data: { completed: true },
    });
    return completedTodo;
  }

  async uncomplete({ id }) {
    const uncompleteTodo = await this.todo.update({
      where: { id: Number(id) },
      data: { completed: false },
    });
    return uncompleteTodo;
  }

  async delete({ id }) {
    await this.todo.delete({ where: { id: Number(id) } });
  }
}

module.exports = TodoRepository;
