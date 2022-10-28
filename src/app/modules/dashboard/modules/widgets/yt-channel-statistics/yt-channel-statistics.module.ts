import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YtChannelStatisticsWidget } from './components/yt-channel-statistics/yt-channel-statistics.widget';
import { WidgetModule, WIDGET_COMPONENT } from '../widget';

@NgModule({
  declarations: [YtChannelStatisticsWidget],
  imports: [CommonModule, WidgetModule],
  providers: [
    {
      provide: WIDGET_COMPONENT,
      useValue: YtChannelStatisticsWidget,
    },
  ],
})
export class YtChannelStatisticsModule {}
