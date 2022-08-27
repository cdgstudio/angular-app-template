import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { delay, finalize, merge, switchMap, tap } from 'rxjs';
import { PageNavigationProgressService } from '../../../../shared/page-navigation-progress';
import { ToDo } from '../../api/to-do.models';
import { ToDoFacade } from '../../facades/to-do.facade';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ToDoFacade],
})
export class ToDoListComponent implements OnInit, OnDestroy {
  private get queryParams(): ParamMap {
    return this.activatedRoute.snapshot.queryParamMap;
  }

  searchForm = new FormGroup({
    query: new FormControl(this.queryParams.has('query') ? String(this.queryParams.get('query')) : '', {
      nonNullable: true,
    }),
    statusTodo: new FormControl(this.queryParams.get('statusTodo') !== 'false', { nonNullable: true }),
    statusDone: new FormControl(this.queryParams.get('statusDone') === 'true', { nonNullable: true }),
    statusRemoved: new FormControl(this.queryParams.get('statusRemoved') === 'true', { nonNullable: true }),
  });

  toDos$ = this.toDoFacade.toDos$;

  private changesSubscription = merge(
    this.searchForm.controls.statusDone.valueChanges,
    this.searchForm.controls.statusRemoved.valueChanges,
    this.searchForm.controls.statusTodo.valueChanges,
  )
    .pipe(
      delay(0),
      tap(() => this.search()),
    )
    .subscribe();

  constructor(
    private toDoFacade: ToDoFacade,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageNavigationProgressService: PageNavigationProgressService,
  ) {}

  ngOnInit(): void {
    this.pageNavigationProgressService.show();
    this.toDoFacade
      .setFilters()
      .pipe(finalize(() => this.pageNavigationProgressService.hide()))
      .subscribe();
  }

  markAsDone(task: ToDo): void {
    this.pageNavigationProgressService.show();
    this.toDoFacade
      .markAsDone(task)
      .pipe(finalize(() => this.pageNavigationProgressService.hide()))
      .subscribe();
  }

  remove(task: ToDo): void {
    this.pageNavigationProgressService.show();
    this.toDoFacade
      .markAsRemoved(task)
      .pipe(finalize(() => this.pageNavigationProgressService.hide()))
      .subscribe();
  }

  search() {
    if (!this.searchForm.valid) {
      return;
    }

    const formValues = this.searchForm.value;
    const newQueryParams: typeof formValues = {};

    let key: keyof typeof formValues;
    for (key in formValues) {
      if (this.searchForm.controls[key].defaultValue !== formValues[key]) {
        newQueryParams[key] = formValues[key] as any;
      }
    }

    this.pageNavigationProgressService.show();
    this.toDoFacade
      .setFilters(formValues)
      .pipe(
        switchMap(() =>
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: newQueryParams,
          }),
        ),
        finalize(() => this.pageNavigationProgressService.hide()),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe();
  }
}
