import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubStarsWidgetComponent } from './github-stars-widget.component';

describe('GithubStarsWidgetComponent', () => {
  let component: GithubStarsWidgetComponent;
  let fixture: ComponentFixture<GithubStarsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubStarsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubStarsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
