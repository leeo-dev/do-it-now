const express = require('express');
const { prisma, disconnect } = require('./helpers/prisma.init');
const todoRouter = require('./routes/todo.routes.js');
const categoryRouter = require('./routes/category.routes.js');
const { cors } = require('./middlewares/cors');

const app = express();
app.use(cors);
app.use(express.json());
app.use('/todo', todoRouter);
app.use('/category', categoryRouter);

process.on('SIGTERM', async () => {
  await disconnect();
});
app.listen(3000, () => console.log('Server is on'));
