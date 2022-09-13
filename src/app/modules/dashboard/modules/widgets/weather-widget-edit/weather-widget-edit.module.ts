import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetEdit } from './components/weather-widget-edit/weather.widget-edit';
import { EDITABLE_WIDGET } from '../widget-edit';
import { ModalModule } from '../../../../../shared/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [WeatherWidgetEdit],
  imports: [CommonModule, ModalModule, ReactiveFormsModule, A11yModule],
  exports: [WeatherWidgetEdit],
  providers: [
    {
      provide: EDITABLE_WIDGET,
      useValue: WeatherWidgetEdit,
    },
  ],
})
export class WeatherWidgetEditModule {}
