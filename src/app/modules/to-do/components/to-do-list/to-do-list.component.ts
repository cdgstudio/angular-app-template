import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
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
export class ToDoListComponent implements OnInit {
  private get queryParams(): Params {
    return this.activatedRoute.snapshot.queryParams;
  }

  searchForm = new FormGroup({
    query: new FormControl(this.queryParams['query'] ?? '', { nonNullable: true }),
  });

  toDos$ = this.toDoFacade.toDos$;

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

    this.pageNavigationProgressService.show();
    this.toDoFacade
      .setFilters(this.searchForm.value)
      .pipe(
        switchMap(() =>
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: this.searchForm.value,
          }),
        ),
        finalize(() => this.pageNavigationProgressService.hide()),
      )
      .subscribe();
  }
}
