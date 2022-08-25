import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timer } from 'rxjs';
import { ToDo } from './to-do.models';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class ToDoApiService {
  constructor() {}

  getToDos(filters: { query?: string } = {}): Observable<ToDo[]> {
    const todos$ = of(Array.from({ length: 10 }).map(this.createToDo));

    return timer(1_000).pipe(switchMap(() => todos$));
  }

  private createToDo() {
    return {
      id: faker.datatype.uuid(),
      description: faker.lorem.words(10),
    };
  }
}
