import { ITodo } from './todo.interface';

interface ICategory {
  id: number;
  name: string;
  todos: ITodo[];
}

type ICategoryParam = Omit<ICategory, 'id'>;

export { ICategory, ICategoryParam };
