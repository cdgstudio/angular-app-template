import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WIDGET, WidgetModule } from '../widget';
import { WeatherWidget } from './components/weather-widget/weather.widget';
import { WeatherDescriptionPipe } from './pipes/weather-description.pipe';
import { WeatherIconUrlPipe } from './pipes/weather-icon-url.pipe';
import { UnixPipe } from './pipes/unix.pipe';

@NgModule({
  declarations: [WeatherWidget, WeatherIconUrlPipe, WeatherDescriptionPipe, UnixPipe],
  imports: [CommonModule, WidgetModule],
  providers: [
    {
      provide: WIDGET,
      useValue: WeatherWidget,
    },
  ],
})
export class WeatherWidgetModule {}
