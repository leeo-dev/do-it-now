import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from './shared/shared.module';
import { CreateCategoryModalComponent } from './category/create-category-modal/create-category-modal.component';
import { TodoComponent } from './todo/todo.component';
import { CreateTodoModalComponent } from './todo/create-todo-modal/create-todo-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCategoryModalComponent } from './category/delete-category-modal/delete-category-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CreateCategoryModalComponent,
    TodoComponent,
    CreateTodoModalComponent,
    DeleteCategoryModalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
