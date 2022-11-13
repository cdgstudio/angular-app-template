import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YtChannelStatisticsWidget } from './components/yt-channel-statistics/yt-channel-statistics.widget';
import { WIDGET_COMPONENT } from '@cdgstudio/dashboard';
import { WidgetModule } from '../widget';

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
