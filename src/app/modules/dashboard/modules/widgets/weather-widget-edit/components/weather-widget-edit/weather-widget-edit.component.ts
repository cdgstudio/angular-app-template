import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { EditableWidgetForm } from '../../../widget-edit';

@Component({
  selector: 'app-weather-widget-edit',
  templateUrl: './weather-widget-edit.component.html',
  styleUrls: ['./weather-widget-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherWidgetEditComponent implements EditableWidgetForm, OnDestroy {
  private newData$ = new Subject<any>();
  constructor(private overlayRef: OverlayRef) {}

  getNewData(): Observable<unknown> {
    return this.newData$;
  }

  close() {
    this.newData$.next('OK');
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    this.newData$.complete();
  }
}
