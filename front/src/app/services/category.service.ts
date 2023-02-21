import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000';
  private pathCategory = `${this.baseUrl}/category`;
  constructor(private http: HttpClient) {}

  findAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.pathCategory);
  }

  create(category: { name: string }): Observable<ICategory> {
    return this.http.post<ICategory>(this.pathCategory, category);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.pathCategory}/${id}`);
  }
}
