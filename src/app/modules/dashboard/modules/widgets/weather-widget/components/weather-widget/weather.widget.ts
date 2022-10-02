import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { EDIT_WIDGET_MODULE, ReloadableWidget, StatefullWidget, Widget, WIDGET } from '../../../widget';
import { WeatherWidgetState } from '../../models/state.models';
import { OpenWeather } from '../../services/open-weather.models';
import { OpenWeatherService } from '../../services/open-weather.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather.widget.html',
  styleUrls: ['./weather.widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: EDIT_WIDGET_MODULE,
      useValue: () => import('../../../weather-widget-edit').then((m) => m.WeatherWidgetEditModule),
    },
    {
      provide: WIDGET,
      useExisting: WeatherWidget,
    },
  ],
})
export class WeatherWidget implements Widget, ReloadableWidget, StatefullWidget<WeatherWidgetState> {
  protected city = 'Warsaw';
  protected lastResponse?: OpenWeather;

  constructor(private changeDetector: ChangeDetectorRef, private openWeatherService: OpenWeatherService) {}

  reload(): Observable<void> {
    return this.openWeatherService.getWeatherForCity(this.city).pipe(
      tap((data) => (this.lastResponse = data)),
      map(() => void 0),
      tap(() => this.changeDetector.markForCheck()),
    );
  }

  setState(value: WeatherWidgetState): Observable<void> {
    if (value === void 0) {
      this.city = 'Warsaw';
      return this.reload();
    }
    this.city = value.city;
    return this.reload();
  }

  getState(): Observable<WeatherWidgetState> {
    return of({ city: this.city });
  }
}
