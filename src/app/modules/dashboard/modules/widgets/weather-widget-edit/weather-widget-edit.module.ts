import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetEditComponent } from './components/weather-widget-edit/weather-widget-edit.component';
import { EDITABLE } from '../widget-edit';
import { ModalModule } from '../../../../../shared/modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WeatherWidgetEditComponent],
  imports: [CommonModule, ModalModule, ReactiveFormsModule],
  exports: [WeatherWidgetEditComponent],
  providers: [
    {
      provide: EDITABLE,
      useValue: WeatherWidgetEditComponent,
    },
  ],
})
export class WeatherWidgetEditModule {}
