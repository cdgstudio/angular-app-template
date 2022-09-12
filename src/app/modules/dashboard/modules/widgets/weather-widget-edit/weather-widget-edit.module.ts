import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetEditComponent } from './components/weather-widget-edit/weather-widget-edit.component';
import { EDITABLE } from '../widget-edit';
import { ModalModule } from '../../../../../shared/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [WeatherWidgetEditComponent],
  imports: [CommonModule, ModalModule, ReactiveFormsModule, A11yModule],
  exports: [WeatherWidgetEditComponent],
  providers: [
    {
      provide: EDITABLE,
      useValue: WeatherWidgetEditComponent,
    },
  ],
})
export class WeatherWidgetEditModule {}
