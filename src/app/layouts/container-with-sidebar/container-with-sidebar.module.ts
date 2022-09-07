import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerWithSidebarComponent } from './components/container-with-sidebar/container-with-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContainerWithSidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [ContainerWithSidebarComponent],
})
export class ContainerWithSidebarModule {}
