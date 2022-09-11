import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild } from '@angular/core';
import { finalize } from 'rxjs';
import { Reloadable, RELOADABLE } from '../../../reloadable-widget';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  @ContentChild(RELOADABLE, { static: true, descendants: false }) reloadableWidget?: Reloadable;

  constructor(private changeDetector: ChangeDetectorRef) {}

  protected isReloading = false;

  reload() {
    if (this.isReloading === true) {
      return;
    }

    this.isReloading = true;
    this.reloadableWidget!.reload()
      .pipe(
        finalize(() => {
          this.isReloading = false;
          this.changeDetector.markForCheck();
        }),
      )
      .subscribe();
  }
}
