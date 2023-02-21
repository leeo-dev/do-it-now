import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryParam } from 'src/app/interfaces/category.interface';
import { ModalService } from 'src/app/services/modal.service';
import { removeNullProperties } from 'src/helpers/check-null';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.css'],
})
export class CreateCategoryModalComponent implements OnInit {
  @Output() categoryEmitter: EventEmitter<ICategoryParam> = new EventEmitter();
  formCategory: FormGroup = new FormGroup({});
  constructor(
    public modalService: ModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setUpForm();
  }

  closeModal(): void {
    this.modalService.toggleModal('category');
  }

  setUpForm(): void {
    this.formCategory = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  resetForm(): void {
    this.formCategory.reset();
  }

  saveCategory($event: Event): void {
    $event.preventDefault();
    const category = removeNullProperties(this.formCategory.value);
    if (Object.keys(category).length === 0) return;
    this.categoryEmitter.emit(category);
    this.resetForm();
    this.closeModal();
  }
}
