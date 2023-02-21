const { Router } = require('express');
const { prisma } = require('../helpers/prisma.init.js');
const categoryRouter = Router();

categoryRouter.get('/', async (req, res) => {
  const categories = await prisma.category.findMany({
    include: { todos: true },
  });
  res.json(categories);
});

categoryRouter.get('/:categoryId/todos', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
      include: { todos: true },
    });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json(category.todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

categoryRouter.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) return res.json({ error: 'Name must be provided' });
    const categoryExists = await prisma.category.findFirst({ where: { name } });
    if (categoryExists) return res.json({ error: 'Category already exists' });
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

categoryRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    if (!category) return res.status(400).json({ error: `Category not found` });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

categoryRouter.put('/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    if (!category) return res.status(400).json({ error: `Category not found` });
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    return res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

categoryRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    if (!categoryExists)
      return res.status(400).json({ error: `category not found` });
    await prisma.category.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = categoryRouter;
