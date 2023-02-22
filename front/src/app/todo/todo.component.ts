import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ITodo } from '../interfaces/todo.interface';
import { ICategory } from '../interfaces/category.interface';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { searchItems } from 'src/helpers/search-item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  category?: ICategory;
  categoryId: number = 0;
  todoList: ITodo[] = [];
  currentId: number = 0;
  searchForm: FormGroup = new FormGroup({});
  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.loadId();
    this.setUpForm();

    this.modalService.register('todo');
    this.modalService.register('delete-todo');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('todo');
    this.modalService.unregister('delete-todo');
  }

  loadId(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.router.navigate(['/']);
      return;
    }
    this.categoryId = id;
    this.loadCategoryAndTodos();
  }

  search(): void {
    this.todoList = searchItems(
      this.category!.todos,
      this.searchForm.get('search')?.value,
      'text'
    );
  }

  setUpForm(): void {
    this.searchForm = this.formBuilder.group({
      search: [null],
    });
  }

  openModal(): void {
    this.modalService.toggleModal('todo');
  }

  get allTasks(): number {
    return this.todoList.length;
  }
  get completedTasks(): number {
    return this.todoList.filter((todo) => todo.completed).length;
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

  loadCategoryAndTodos(): void {
    this.categoryService.findById(this.categoryId).subscribe({
      next: (response) => this.onLoadTodosSuccess(response),
      error: () => this.onLoadTodosError(),
    });
  }

  onLoadTodosSuccess(category: ICategory): void {
    this.category = category;
    this.todoList = category.todos;
  }

  onLoadTodosError(): void {
    this.router.navigate(['/']);
  }

  confirmDeleteTodo(): void {
    this.todoService.delete(this.currentId).subscribe({
      next: () => this.onDeleteTodoSuccess(),
      error: () => this.onDeleteTodoError(),
    });
  }

  deleteTodo(id: number): void {
    this.currentId = id;
    this.modalService.toggleModal('delete-todo');
  }

  onDeleteTodoSuccess(): void {
    this.loadId();
    this.modalService.toggleModal('delete-todo');
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
