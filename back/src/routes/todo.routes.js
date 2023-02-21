const { Router } = require('express');
const todoController = require('../controllers/todo.controller.js');
const todoRouter = Router();

todoRouter.post('/', todoController.create);
todoRouter.get('/', todoController.findAll);
todoRouter.get('/:id', todoController.findById);
todoRouter.put('/:id', todoController.update);
todoRouter.put('/:id/complete', todoController.complete);
todoRouter.put('/:id/uncomplete', todoController.uncomplete);
todoRouter.delete('/:id', todoController.delete);

module.exports = todoRouter;
