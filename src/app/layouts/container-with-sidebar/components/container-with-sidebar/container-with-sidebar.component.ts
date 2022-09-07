import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-with-sidebar',
  templateUrl: './container-with-sidebar.component.html',
  styleUrls: ['./container-with-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerWithSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
