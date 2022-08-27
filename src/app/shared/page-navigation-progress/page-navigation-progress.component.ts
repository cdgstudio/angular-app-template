import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy } from '@angular/core';
import { takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-page-navigation-progress',
  templateUrl: './page-navigation-progress.component.html',
  styleUrls: ['./page-navigation-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavigationProgressComponent implements OnDestroy {
  private sub = timer(0, 20)
    .pipe(takeWhile((value) => value <= 80))
    .subscribe((i) => {
      this.el.nativeElement.style.width = `${i}vw`;
    });

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
