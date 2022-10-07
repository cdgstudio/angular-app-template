import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-column, [app-form-column]',
  templateUrl: './form-column.component.html',
  styleUrls: ['./form-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormColumnComponent {}
