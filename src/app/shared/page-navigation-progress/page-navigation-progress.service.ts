import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { PageNavigationProgressComponent } from './page-navigation-progress.component';

@Injectable({
  providedIn: 'root',
})
export class PageNavigationProgressService {
  private overlayRef?: OverlayRef;
  constructor(private overlay: Overlay) {}

  show() {
    if (this.overlayRef !== void 0) {
      return;
    }

    this.overlayRef = this.overlay.create();

    const portal = new ComponentPortal(PageNavigationProgressComponent);
    this.overlayRef.attach(portal);
  }

  hide() {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.addPanelClass('finish');
      timer(100).subscribe(() => {
        this.overlayRef?.dispose();
        this.overlayRef = void 0;
      });
    }
  }
}
