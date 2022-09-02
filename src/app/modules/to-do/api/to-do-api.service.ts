import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, timer } from 'rxjs';
import { ToDo, ToDoStatus } from './to-do.models';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class ToDoApiService {
  getToDos(filters: { query?: string; statuses?: ToDoStatus[] } = {}): Observable<ToDo[]> {
    const todos$ = of(
      Array.from({ length: 10 }).map(() =>
        this.createToDo({
          status: faker.helpers.arrayElement(filters.statuses ?? ['TO_DO', 'DONE']),
        }),
      ),
    );

    return timer(1_000).pipe(switchMap(() => todos$));
  }

  markAsDone(toDo: ToDo): Observable<ToDo> {
    return timer(1_500).pipe(map(() => ({ ...toDo, status: 'DONE' })));
  }

  markAsToDo(toDo: ToDo): Observable<ToDo> {
    return timer(2_500).pipe(map(() => ({ ...toDo, status: 'TO_DO' })));
  }

  private createToDo(initialData: Partial<ToDo> = {}): ToDo {
    return {
      id: faker.datatype.uuid(),
      description: faker.lorem.words(10),
      status: faker.helpers.arrayElement(['TO_DO', 'DONE']),
      ...initialData,
    };
  }
}
