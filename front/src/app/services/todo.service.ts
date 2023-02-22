import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from '../interfaces/todo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:3000';
  private pathTodo = `${this.baseUrl}/todo`;
  constructor(private http: HttpClient) {}

  create(todo: { text: string }): Observable<ITodo> {
    return this.http.post<ITodo>(this.pathTodo, todo);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.pathTodo}/${id}`);
  }

  complete(id: number): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.pathTodo}/${id}/complete`, {});
  }

  uncomplete(id: number): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.pathTodo}/${id}/uncomplete`, {});
  }
}
