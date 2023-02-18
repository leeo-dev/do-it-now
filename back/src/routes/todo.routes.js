const { Router } = require('express');
const { prisma } = require('../helpers/prisma.init.js');
const todoController = require('../controllers/todo.controller.js');
const todoRouter = Router();

todoRouter.get('/test', todoController.listAll);

todoRouter.get('/', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

todoRouter.post('/', async (req, res) => {
  const { text, categoryId } = req.body;

  if (!text || !categoryId)
    return res.status(400).json({ error: `Text or Category must be provided` });

  const categoryExists = await prisma.category.findFirst({
    where: { id: categoryId },
  });

  if (!categoryExists)
    return res
      .status(400)
      .json({ error: `Category id ${categoryId} not found` });

  const todo = await prisma.todo.create({
    data: {
      category: { connect: { id: categoryId } },
      text,
    },
  });

  res.json(todo);
});

todoRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findFirst({ where: { id: Number(id) } });
  if (!todo) return res.status(400).json({ error: `Todo not found` });

  res.json(todo);
});

todoRouter.put('/:id', async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  const todo = await prisma.todo.findFirst({ where: { id: Number(id) } });
  if (!todo) return res.status(400).json({ error: `Todo not found` });
  const updatedTodo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { text },
  });

  res.json(updatedTodo);
});

todoRouter.put('/:id/complete', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findFirst({ where: { id: Number(id) } });
  if (!todo) return res.status(400).json({ error: `Todo not found` });
  const updatedTodo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { completed: true },
  });

  res.json(updatedTodo);
});

todoRouter.put('/:id/uncomplete', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findFirst({ where: { id: Number(id) } });
  if (!todo) return res.status(400).json({ error: `Todo not found` });
  const updatedTodo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { completed: false },
  });

  res.json(updatedTodo);
});

todoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const todoExists = await prisma.todo.findFirst({ where: { id: Number(id) } });
  if (!todoExists) return res.status(400).json({ error: `Todo not found` });
  await prisma.todo.delete({ where: { id: Number(id) } });
  res.status(204).send();
});

module.exports = todoRouter;
