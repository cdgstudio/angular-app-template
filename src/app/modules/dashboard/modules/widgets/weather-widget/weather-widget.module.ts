import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WidgetModule } from '../widget';
import { WeatherWidget } from './components/weather-widget/weather.widget';
import { WeatherDescriptionPipe } from './pipes/weather-description.pipe';
import { WeatherIconUrlPipe } from './pipes/weather-icon-url.pipe';
import { UnixPipe } from './pipes/unix.pipe';
import { WIDGET_COMPONENT } from '@cdgstudio/dashboard';

@NgModule({
  declarations: [WeatherWidget, WeatherIconUrlPipe, WeatherDescriptionPipe, UnixPipe],
  imports: [CommonModule, WidgetModule],
  providers: [
    {
      provide: WIDGET_COMPONENT,
      useValue: WeatherWidget,
    },
  ],
})
export class WeatherWidgetModule {}
