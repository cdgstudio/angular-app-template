import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { WeatherIconUrlPipe } from './pipes/weather-icon-url.pipe';
import { WeatherDescriptionPipe } from './pipes/weather-description.pipe';

@NgModule({
  declarations: [WeatherWidgetComponent, WeatherIconUrlPipe, WeatherDescriptionPipe],
  imports: [CommonModule],
  exports: [WeatherWidgetComponent],
})
export class WeatherWidgetModule {}
