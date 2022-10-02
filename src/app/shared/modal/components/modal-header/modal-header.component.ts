import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent {
  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.closeModal();
  }
}
