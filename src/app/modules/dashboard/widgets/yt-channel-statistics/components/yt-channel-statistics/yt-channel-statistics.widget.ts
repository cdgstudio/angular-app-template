import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { EDIT_WIDGET_MODULE, StatefullWidget, WIDGET } from '@cdgstudio/dashboard';
import { EMPTY, map, Observable, ReplaySubject, shareReplay, switchMap } from 'rxjs';
import { YtChannelStatisticsService } from '../../services/yt-channel-statistics.service';

@Component({
  selector: 'app-yt-channel-statistics',
  templateUrl: './yt-channel-statistics.widget.html',
  styleUrls: ['./yt-channel-statistics.widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: WIDGET,
      useExisting: YtChannelStatisticsWidget,
    },
    {
      provide: EDIT_WIDGET_MODULE,
      useValue: () => import('../../../yt-channel-statistics-edit').then((m) => m.YtChannelStatisticsEditModule),
    },
  ],
})
export class YtChannelStatisticsWidget implements StatefullWidget<string>, OnDestroy {
  private channelId$ = new ReplaySubject<string>(1);
  stats$ = this.channelId$.pipe(
    switchMap((channelId) => this.ytChannelStatisticsService.getChannelStatistics(channelId)),
    shareReplay({ refCount: true }),
  );
  channel$ = this.stats$.pipe(map((x) => x.channel));

  constructor(private ytChannelStatisticsService: YtChannelStatisticsService) {}

  setState(value: string): Observable<void> {
    if (value === undefined) {
      this.channelId$.next('UCy-ez61m5LdG3FQVr-4Crcw');
    } else {
      this.channelId$.next(value);
    }

    return EMPTY;
  }

  getState(): Observable<string> {
    return this.channelId$;
  }

  ngOnDestroy(): void {
    this.channelId$.complete();
  }
}
