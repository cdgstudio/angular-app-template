import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerWithSidebarComponent } from './components/container-with-sidebar/container-with-sidebar.component';
import { RouterModule } from '@angular/router';
import { RouterLinkDirective } from './directives/router-link.directive';

@NgModule({
  declarations: [ContainerWithSidebarComponent, RouterLinkDirective],
  imports: [CommonModule, RouterModule],
  exports: [ContainerWithSidebarComponent],
})
export class ContainerWithSidebarModule {}
