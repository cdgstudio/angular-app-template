import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { GithubStarsWidgetState } from '../../../github-stars-widget';
import { EditableWidgetForm, WidgetState } from '../../../widget';

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
    private overlayRef: OverlayRef,
    @Inject(WidgetState)
    private currentState: GithubStarsWidgetState,
  ) {}

  getNewData(): Observable<GithubStarsWidgetState> {
    return this.newData$;
  }

  update() {
    this.newData$.next(this.form.value as GithubStarsWidgetState);
    this.close();
  }

  close() {
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    this.newData$.complete();
  }
}
