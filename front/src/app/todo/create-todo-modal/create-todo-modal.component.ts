import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.css'],
})
export class CreateTodoModalComponent implements OnInit, OnDestroy {
  constructor(public modalService: ModalService) {}
  ngOnInit(): void {
    this.modalService.register('todo');
  }
  ngOnDestroy(): void {
    this.modalService.unregister('todo');
  }
  closeModal(): void {
    this.modalService.toggleModal('todo');
  }
}
