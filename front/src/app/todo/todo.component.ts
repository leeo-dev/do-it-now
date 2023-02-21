import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  constructor(public modalService: ModalService) {}
  title: string = 'Grocery List';
  tasks = { all: 8, completed: 5 };
  openModal(): void {
    this.modalService.toggleModal('todo');
  }
}
