import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ITodo } from '../interfaces/todo.interface';
import { ICategory } from '../interfaces/category.interface';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: ITodo[] = [];
  categoryId: number = 0;
  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private todoService: TodoService
  ) {}
  ngOnInit(): void {
    this.loadId();
  }

  loadId(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.router.navigate(['/']);
      return;
    }
    this.categoryId = id;
    this.loadTodos();
  }

  title: string = 'Grocery List';

  tasks = { all: 8, completed: 5 };

  openModal(): void {
    this.modalService.toggleModal('todo');
  }

  createTodo(todo: ITodo): void {
    const newTodo = Object.assign(todo, { categoryId: this.categoryId });
    this.todoService.create(newTodo).subscribe({
      next: () => this.onCreateTodoSuccess(),
      error: () => this.onCreateTodoError(),
    });
  }

  onCreateTodoSuccess(): void {
    this.loadId();
  }
  onCreateTodoError(): void {}

  loadTodos(): void {
    this.categoryService.loadTodos(this.categoryId).subscribe({
      next: (response) => this.onLoadTodosSuccess(response),
      error: () => this.onLoadTodosError(),
    });
  }

  onLoadTodosSuccess(todos: ITodo[]): void {
    this.todos = todos;
  }

  onLoadTodosError(): void {
    this.router.navigate(['/']);
  }

  deleteTodo(id: number): void {
    this.todoService.delete(id).subscribe({
      next: () => this.onDeleteTodoSuccess(),
      error: () => this.onDeleteTodoError(),
    });
  }

  onDeleteTodoSuccess(): void {
    this.loadId();
  }
  onDeleteTodoError(): void {}

  completeTodo(id: number): void {
    this.todoService.complete(id).subscribe({
      next: () => this.onCompleteTodoSuccess(),
      error: () => this.onCompleteTodoError(),
    });
  }

  onCompleteTodoSuccess(): void {
    this.loadId();
  }
  onCompleteTodoError(): void {}

  uncompleteTodo(id: number): void {
    this.todoService.uncomplete(id).subscribe({
      next: () => this.onUncompleteTodoSuccess(),
      error: () => this.onUncompleteTodoError(),
    });
  }

  onUncompleteTodoSuccess(): void {
    this.loadId();
  }
  onUncompleteTodoError(): void {}
}
