import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[app-modal-title]',
  templateUrl: './modal-title.component.html',
  styleUrls: ['./modal-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTitleComponent {}
