import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSidebarComponent } from './components/page-sidebar/page-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageSidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [PageSidebarComponent],
})
export class PageSidebarModule {}
