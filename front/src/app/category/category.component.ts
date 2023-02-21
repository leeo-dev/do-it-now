import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { CategoryService } from '../services/category.service';
import { ICategory, ICategoryParam } from '../interfaces/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  title: string = 'Categories';
  categories: ICategory[] = [];

  constructor(
    public modalService: ModalService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.modalService.register('category');
    this.listCategories();
  }
  ngOnDestroy(): void {
    this.modalService.unregister('category');
  }

  openModal(): void {
    this.modalService.toggleModal('category');
  }

  listCategories(): void {
    this.categoryService.findAll().subscribe({
      next: (response) => this.onListCategoriesSuccess(response),
      error: (error) => this.onListCategoriesError(error),
    });
  }

  onListCategoriesSuccess(categories: ICategory[]): void {
    this.categories = categories;
  }
  onListCategoriesError(error: unknown): void {}

  saveCategory(category: ICategoryParam): void {
    this.categoryService.create(category).subscribe({
      next: (response) => this.onSaveCategorySuccess(response),
      error: (error) => this.onSaveCategoryError(error),
    });
  }

  onSaveCategorySuccess(category: ICategory): void {
    this.categories.push(category);
  }
  onSaveCategoryError(error: unknown): void {}
}
