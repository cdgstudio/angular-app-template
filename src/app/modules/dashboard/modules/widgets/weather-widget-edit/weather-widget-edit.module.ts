import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../../../../../shared/modal';
import { EDIT_WIDGET_COMPONENT } from '../widget';
import { WeatherWidgetEdit } from './components/weather-widget-edit/weather.widget-edit';

@NgModule({
  declarations: [WeatherWidgetEdit],
  imports: [CommonModule, ModalModule, ReactiveFormsModule, A11yModule],
  exports: [WeatherWidgetEdit],
  providers: [
    {
      provide: EDIT_WIDGET_COMPONENT,
      useValue: WeatherWidgetEdit,
    },
  ],
})
export class WeatherWidgetEditModule {}
