import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector, Type } from '@angular/core';

export interface ModalConfig {
  injector?: Injector;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  overlayRef: undefined | OverlayRef;
  constructor(private overlay: Overlay, private injector: Injector) {}

  showModal<T>(Component: Type<T>, config: ModalConfig = {}): ComponentRef<T> {
    if (this.overlayRef === void 0) {
      this.overlayRef = this.overlay.create({
        positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
        hasBackdrop: true,
      });
    }

    if (this.overlayRef.hasAttached()) {
      this.closeModal();
    }

    const injector = Injector.create({
      providers: [],
      parent: config.injector ?? this.injector,
    });

    const portal = new ComponentPortal(Component, null, injector);
    return this.overlayRef.attach(portal);
  }

  closeModal(): void {
    this.overlayRef?.dispose();
    this.overlayRef = void 0;
  }
}
