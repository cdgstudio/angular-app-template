import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditableWidgetForm, WidgetState } from '@cdgstudio/dashboard';
import { Observable, Subject } from 'rxjs';
import { ModalService } from '../../../../../../../shared/modal';

@Component({
  selector: 'app-weather-widget-edit',
  templateUrl: './weather.widget-edit.html',
  styleUrls: ['./weather.widget-edit.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherWidgetEdit implements EditableWidgetForm, OnDestroy {
  form = new FormGroup({
    city: new FormControl(this.currentState.city, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private newData$ = new Subject<any>();

  constructor(private modalService: ModalService, @Inject(WidgetState) private currentState: { city: string }) {}

  getNewData(): Observable<unknown> {
    return this.newData$;
  }

  update() {
    this.newData$.next(this.form.value);
    this.close();
  }

  close() {
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    this.newData$.complete();
  }
}
