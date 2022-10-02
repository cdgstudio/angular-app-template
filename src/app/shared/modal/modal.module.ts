import { NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalBodyComponent } from './components/modal-body/modal-body.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ModalTitleComponent } from './components/modal-title/modal-title.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CloseModalDirective } from './directives/close-modal.directive';

@NgModule({
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleComponent,
    CloseModalDirective,
  ],
  imports: [CommonModule],
  exports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleComponent,
    CloseModalDirective,
  ],
})
export class ModalModule {
  constructor(@Optional() overlayModule: OverlayModule) {
    if (overlayModule === null) {
      throw new Error(`${ModalModule.name} require ${OverlayModule.name} module in AppModule.`);
    }
  }
}
