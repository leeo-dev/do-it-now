import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-delete-todo-modal',
  templateUrl: './delete-todo-modal.component.html',
  styleUrls: ['./delete-todo-modal.component.css'],
})
export class DeleteTodoModalComponent {
  @Output() confirmDelete: EventEmitter<boolean> = new EventEmitter();
  constructor(public modalService: ModalService) {}

  closeModal(): void {
    this.modalService.toggleModal('delete-category');
  }

  delete(): void {
    this.confirmDelete.emit(true);
    this.closeModal();
  }
}
