const todoService = { findAll: () => ({ data: 'leo' }) };

class TodoController {
  #todoService;
  constructor(todoService = { findAll: () => ({ data: 'leo' }) }) {
    this.#todoService = todoService;
  }

  async listAll(request, response) {
    try {
      if (!this.#todoService) throw new Error('Service not found');
      const all = await this.#todoService.findAll();
      return response.json(all);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new TodoController(todoService);
