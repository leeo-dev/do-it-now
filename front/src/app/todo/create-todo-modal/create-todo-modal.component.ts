import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodo } from 'src/app/interfaces/todo.interface';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.css'],
})
export class CreateTodoModalComponent implements OnInit, OnDestroy {
  @Output() createEmitter: EventEmitter<ITodo> = new EventEmitter();
  todoForm: FormGroup = new FormGroup({});

  constructor(
    public modalService: ModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.modalService.register('todo');
    this.setUpForm();
  }

  setUpForm(): void {
    this.todoForm = this.formBuilder.group({
      text: [null, Validators.required],
    });
  }

  resetForm(): void {
    this.todoForm.reset();
  }

  ngOnDestroy(): void {
    this.modalService.unregister('todo');
  }

  closeModal(): void {
    this.modalService.toggleModal('todo');
  }

  create($event: Event): void {
    $event.preventDefault();
    if (this.todoForm.invalid) return;
    this.createEmitter.emit(this.todoForm.value);
    this.closeModal();
    this.resetForm();
  }
}
