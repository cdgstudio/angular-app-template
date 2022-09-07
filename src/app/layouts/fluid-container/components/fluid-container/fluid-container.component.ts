import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fluid-container',
  templateUrl: './fluid-container.component.html',
  styleUrls: ['./fluid-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluidContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
