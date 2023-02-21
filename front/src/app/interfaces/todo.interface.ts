interface ITodo {
  id: number;
  text: string;
  completed: boolean;
  categoryId: number;
}

type ITodoParam = Omit<ITodo, 'id'>;

export { ITodo, ITodoParam };
