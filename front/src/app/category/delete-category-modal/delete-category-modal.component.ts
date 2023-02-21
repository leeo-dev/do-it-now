import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.css'],
})
export class DeleteCategoryModalComponent {
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
