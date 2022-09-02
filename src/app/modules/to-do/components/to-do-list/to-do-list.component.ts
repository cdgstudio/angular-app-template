import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { delay, finalize, merge, Subscription, switchMap, tap } from 'rxjs';
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
  private changesSubscription = new Subscription();
  private get queryParams(): ParamMap {
    return this.activatedRoute.snapshot.queryParamMap;
  }

  searchForm = new FormGroup({
    query: new FormControl('', { nonNullable: true }),
    statusTodo: new FormControl(true, { nonNullable: true }),
    statusDone: new FormControl(false, { nonNullable: true }),
  });

  toDos$ = this.toDoFacade.toDos$;

  constructor(
    private toDoFacade: ToDoFacade,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageNavigationProgressService: PageNavigationProgressService,
  ) {}

  ngOnInit(): void {
    this.searchForm.patchValue({
      query: this.queryParams.has('query')
        ? String(this.queryParams.get('query'))
        : this.searchForm.controls.query.defaultValue,
      statusTodo: this.queryParams.has('statusTodo')
        ? this.queryParams.get('statusTodo') !== 'false'
        : this.searchForm.controls.statusTodo.defaultValue,
      statusDone: this.queryParams.has('statusDone')
        ? this.queryParams.get('statusDone') === 'true'
        : this.searchForm.controls.statusDone.defaultValue,
    });

    this.pageNavigationProgressService.show();
    this.toDoFacade
      .setFilters()
      .pipe(finalize(() => this.pageNavigationProgressService.hide()))
      .subscribe();

    this.changesSubscription.unsubscribe();
    this.changesSubscription = merge(
      this.searchForm.controls.statusDone.valueChanges,
      this.searchForm.controls.statusTodo.valueChanges,
    )
      .pipe(
        delay(0),
        tap(() => this.search()),
      )
      .subscribe();
  }

  markAsDone(task: ToDo): void {
    this.pageNavigationProgressService.show();
    this.toDoFacade
      .markAsDone(task)
      .pipe(finalize(() => this.pageNavigationProgressService.hide()))
      .subscribe();
  }

  markAsToDo(task: ToDo): void {
    this.pageNavigationProgressService.show();
    this.toDoFacade
      .markAsToDo(task)
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
