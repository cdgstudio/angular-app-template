import { TestBed } from '@angular/core/testing';

import { YtChannelStatisticsService } from './yt-channel-statistics.service';

describe('YtChannelStatisticsService', () => {
  let service: YtChannelStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtChannelStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
