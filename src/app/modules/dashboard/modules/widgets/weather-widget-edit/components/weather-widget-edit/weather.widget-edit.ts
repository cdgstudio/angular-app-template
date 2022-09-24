import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { EditableWidgetForm } from '../../../widget';

@Component({
  selector: 'app-weather-widget-edit',
  templateUrl: './weather.widget-edit.html',
  styleUrls: ['./weather.widget-edit.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherWidgetEdit implements EditableWidgetForm, OnDestroy {
  form = new FormGroup({
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private newData$ = new Subject<any>();

  constructor(private overlayRef: OverlayRef) {}

  getNewData(): Observable<unknown> {
    return this.newData$;
  }

  update() {
    this.newData$.next(this.form.value);
    this.close();
  }

  close() {
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    this.newData$.complete();
  }
}
