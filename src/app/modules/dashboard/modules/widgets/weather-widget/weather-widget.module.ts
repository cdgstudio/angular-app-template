import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WidgetModule } from '../widget';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { WeatherDescriptionPipe } from './pipes/weather-description.pipe';
import { WeatherIconUrlPipe } from './pipes/weather-icon-url.pipe';
import { UnixPipe } from './pipes/unix.pipe';

@NgModule({
  declarations: [WeatherWidgetComponent, WeatherIconUrlPipe, WeatherDescriptionPipe, UnixPipe],
  imports: [CommonModule, WidgetModule],
  exports: [WeatherWidgetComponent],
})
export class WeatherWidgetModule {}
