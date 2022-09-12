import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalBodyComponent } from './components/modal-body/modal-body.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ModalTitleComponent } from './components/modal-title/modal-title.component';

@NgModule({
  declarations: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalTitleComponent],
  imports: [CommonModule],
  exports: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalTitleComponent],
})
export class ModalModule {}
