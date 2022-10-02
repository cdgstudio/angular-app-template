import { Directive, HostListener } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Directive({
  selector: '[appCloseModal]',
})
export class CloseModalDirective {
  constructor(private modalService: ModalService) {}

  @HostListener('click')
  handleClick() {
    this.modalService.closeModal();
  }
}
