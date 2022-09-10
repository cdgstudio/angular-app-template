import { Directive, HostListener } from '@angular/core';
import { ContainerWithSidebarComponent } from '../components/container-with-sidebar/container-with-sidebar.component';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirective {
  constructor(private component: ContainerWithSidebarComponent) {}

  @HostListener('click')
  handleClickEvent() {
    this.component.collapsed = true;
  }
}
