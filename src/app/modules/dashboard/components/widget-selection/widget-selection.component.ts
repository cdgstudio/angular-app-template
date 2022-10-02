import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-selection',
  templateUrl: './widget-selection.component.html',
  styleUrls: ['./widget-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetSelectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
