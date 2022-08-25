import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-sidebar',
  templateUrl: './page-sidebar.component.html',
  styleUrls: ['./page-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSidebarComponent {
  constructor() {}
}
