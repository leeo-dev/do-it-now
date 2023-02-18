const { prisma } = require('./helpers/prisma.init.js');
const TodoService = require('./services/todo.service.js');
const todoService = new TodoService({ todo: prisma.todo });
(async () => {
  await todoService.create({ text: 'Task', categoryId: 2 });
  const all = await todoService.findAll();
  console.log(all);
})();
