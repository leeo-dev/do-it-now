import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { CategoryService } from '../services/category.service';
import { ICategory, ICategoryParam } from '../interfaces/category.interface';
import { searchItems } from 'src/helpers/search-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  title: string = 'Categories';
  categories: ICategory[] = [];
  categoriesList: ICategory[] = [];
  currentId: number = 0;
  searchForm: FormGroup = new FormGroup({});

  constructor(
    public modalService: ModalService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.modalService.register('category');
    this.modalService.register('delete-category');
    this.listCategories();
    this.setUpForm();
  }
  ngOnDestroy(): void {
    this.modalService.unregister('category');
    this.modalService.unregister('delete-category');
  }

  setUpForm(): void {
    this.searchForm = this.formBuilder.group({
      search: [null],
    });
  }

  search(): void {
    this.categoriesList = searchItems(
      this.categories,
      this.searchForm.get('search')?.value,
      'name'
    );
  }

  openModal(id: string): void {
    this.modalService.toggleModal(id);
  }

  listCategories(): void {
    this.categoryService.findAll().subscribe({
      next: (response) => this.onListCategoriesSuccess(response),
      error: (error) => this.onListCategoriesError(error),
    });
  }

  onListCategoriesSuccess(categories: ICategory[]): void {
    this.categories = categories;
    this.categoriesList = this.categories;
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

  handleDeleteCategory(id: number): void {
    this.currentId = id;
    this.openModal('delete-category');
  }

  deleteCategory(isDelete: boolean): void {
    if (!isDelete) return;
    this.categoryService.delete(this.currentId).subscribe({
      next: () => this.onDeleteCategorySuccess(),
      error: () => this.onDeleteCategoryError(),
    });
  }

  onDeleteCategorySuccess(): void {
    this.listCategories();
  }
  onDeleteCategoryError(): void {}
}
