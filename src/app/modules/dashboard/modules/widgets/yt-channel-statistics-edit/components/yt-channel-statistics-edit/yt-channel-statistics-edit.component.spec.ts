import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtChannelStatisticsEditComponent } from './yt-channel-statistics-edit.component';

describe('YtChannelStatisticsEditComponent', () => {
  let component: YtChannelStatisticsEditComponent;
  let fixture: ComponentFixture<YtChannelStatisticsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YtChannelStatisticsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YtChannelStatisticsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
