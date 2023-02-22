import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from 'src/app/interfaces/todo.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: ITodo | null = null;
  @Output() deleteEmitter: EventEmitter<number> = new EventEmitter();
  @Output() completeEmitter: EventEmitter<number> = new EventEmitter();
  @Output() uncompleteEmitter: EventEmitter<number> = new EventEmitter();

  handleCompleteOrUncomplete(): void {
    this.todo?.completed ? this.uncomplete() : this.complete();
  }

  delete(): void {
    this.deleteEmitter.emit(this.todo?.id);
  }

  complete(): void {
    this.completeEmitter.emit(this.todo?.id);
  }

  uncomplete(): void {
    this.uncompleteEmitter.emit(this.todo?.id);
  }
}
