import { Component, ElementRef, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-page-navigation-progress',
  templateUrl: './page-navigation-progress.component.html',
  styleUrls: ['./page-navigation-progress.component.scss'],
})
export class PageNavigationProgressComponent implements OnDestroy {
  private sub?: Subscription;

  constructor(private el: ElementRef<HTMLElement>) {
    timer(0, 20).subscribe((i) => {
      const width = Math.min(i, 80);
      this.el.nativeElement.style.width = `${width}vw`;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
