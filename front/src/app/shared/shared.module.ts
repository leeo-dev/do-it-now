import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    ModalComponent,
    TodoItemComponent,
  ],
  imports: [CommonModule],
  exports: [HeaderComponent, CardComponent, ModalComponent, TodoItemComponent],
})
export class SharedModule {}
