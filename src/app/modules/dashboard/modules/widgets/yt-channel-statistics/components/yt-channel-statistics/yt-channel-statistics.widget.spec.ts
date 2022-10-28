import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtChannelStatisticsWidget } from './yt-channel-statistics.widget';

describe('YtChannelStatisticsWidget', () => {
  let component: YtChannelStatisticsWidget;
  let fixture: ComponentFixture<YtChannelStatisticsWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YtChannelStatisticsWidget ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YtChannelStatisticsWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
