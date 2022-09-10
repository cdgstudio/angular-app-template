import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fluid-container',
  templateUrl: './fluid-container.component.html',
  styleUrls: ['./fluid-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FluidContainerComponent {}
