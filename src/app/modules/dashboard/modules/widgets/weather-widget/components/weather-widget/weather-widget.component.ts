import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';
import { Reloadable, RELOADABLE } from '../../../reloadable-widget';
import { EDITABLE } from '../../../widget-edit';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: RELOADABLE,
      useExisting: WeatherWidgetComponent,
    },
    {
      provide: EDITABLE,
      useValue: () =>
        import('../../../weather-widget-edit/weather-widget-edit.module').then((m) => m.WeatherWidgetEditModule),
    },
  ],
})
export class WeatherWidgetComponent implements OnInit, Reloadable {
  protected weather = ['sunny', 'rain', 'snow', 'question'] as const;
  protected currentWeather: typeof this.weather[number] = 'question';

  constructor(private changeDetector: ChangeDetectorRef) {
    changeDetector.detach();
  }

  ngOnInit() {
    this.changeDetector.detectChanges();
    this.reload().subscribe();
  }

  reload(): Observable<void> {
    return timer(1_500).pipe(
      tap(() => (this.currentWeather = this.weather[(this.weather.length * Math.random()) | 0])),
      map(() => void 0),
      tap(() => this.changeDetector.detectChanges()),
    );
  }
}
