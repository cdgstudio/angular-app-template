import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { finalize } from 'rxjs';
import { PageNavigationProgressService } from '../../../shared/page-navigation-progress';
import { ToDoApiService } from '../api/to-do-api.service';
import { ToDo } from '../api/to-do.models';

@Injectable({
  providedIn: 'root',
})
export class TodosResolver implements Resolve<ToDo[]> {
  constructor(
    private toDoApiService: ToDoApiService,
    private pageNavigationProgressService: PageNavigationProgressService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.pageNavigationProgressService.show();
    const query = route.queryParamMap.get('query') ?? void 0;

    console.log(this.pageNavigationProgressService);

    return this.toDoApiService.getToDos({ query }).pipe(finalize(() => this.pageNavigationProgressService.hide()));
  }
}
