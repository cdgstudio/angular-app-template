import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetEditComponent } from './components/weather-widget-edit/weather-widget-edit.component';
import { WIDGET_EDIT_COMPONENT } from '../widget-edit';

@NgModule({
  declarations: [WeatherWidgetEditComponent],
  imports: [CommonModule],
  exports: [WeatherWidgetEditComponent],
  providers: [
    {
      provide: WIDGET_EDIT_COMPONENT,
      useValue: WeatherWidgetEditComponent,
    },
  ],
})
export class WeatherWidgetEditModule {}
