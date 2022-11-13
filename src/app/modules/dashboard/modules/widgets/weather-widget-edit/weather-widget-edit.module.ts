import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EDIT_WIDGET_COMPONENT } from '@cdgstudio/dashboard';
import { ButtonModule } from '../../../../../shared/button';
import { InputModule } from '../../../../../shared/input';
import { ModalModule } from '../../../../../shared/modal';
import { WeatherWidgetEdit } from './components/weather-widget-edit/weather.widget-edit';

@NgModule({
  declarations: [WeatherWidgetEdit],
  imports: [CommonModule, ModalModule, ReactiveFormsModule, A11yModule, ButtonModule, InputModule],
  exports: [WeatherWidgetEdit],
  providers: [
    {
      provide: EDIT_WIDGET_COMPONENT,
      useValue: WeatherWidgetEdit,
    },
  ],
})
export class WeatherWidgetEditModule {}
