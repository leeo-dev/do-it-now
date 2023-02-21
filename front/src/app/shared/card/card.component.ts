import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() category: ICategory | null = null;

  constructor(private router: Router) {}

  get percent(): string {
    const totalTodo = this.category!.todos.length;
    const totalCompletedTodo = this.completes;
    if (!totalCompletedTodo && !totalTodo) return `${0}%`;
    return `${Math.round((totalCompletedTodo / totalTodo) * 100)}%`;
  }

  get total(): number {
    return this.category!.todos.length;
  }

  get completes(): number {
    const completed = this.category!.todos.filter((todo) => todo.completed);
    return completed.length;
  }

  listTodoByCategory() {
    this.router.navigate([`/todo/${this.category?.id}`]);
  }
}
