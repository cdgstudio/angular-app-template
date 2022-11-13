import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditableWidgetForm, WidgetState } from '@cdgstudio/dashboard';
import { Observable, Subject } from 'rxjs';
import { ModalService } from '../../../../../../../shared/modal';
import { GithubStarsWidgetState } from '../../../github-stars-widget';

@Component({
  selector: 'app-github-stars-widget-edit',
  templateUrl: './github-stars-widget-edit.component.html',
  styleUrls: ['./github-stars-widget-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubStarsWidgetEditComponent implements EditableWidgetForm<GithubStarsWidgetState>, OnDestroy {
  private newData$ = new Subject<GithubStarsWidgetState>();

  form = new FormGroup({
    organization: new FormControl(this.currentState.organization, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    project: new FormControl(this.currentState.project, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    @Inject(WidgetState)
    private currentState: GithubStarsWidgetState,
    private modalService: ModalService,
  ) {}

  getNewData(): Observable<GithubStarsWidgetState> {
    return this.newData$;
  }

  update() {
    this.newData$.next(this.form.value as GithubStarsWidgetState);
    this.close();
  }

  close() {
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    this.newData$.complete();
  }
}
