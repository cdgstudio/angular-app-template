import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from '../../shared/modal';
import { DashboardPage } from './components/pages/dashboard/dashboard.page';
import { WidgetSelectionComponent } from './components/widget-selection/widget-selection.component';
import { WidgetLoaderDirective } from './directives/widget-loader.directive';

const routes: Routes = [{ path: '', component: DashboardPage }];

@NgModule({
  declarations: [DashboardPage, WidgetLoaderDirective, WidgetSelectionComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ModalModule],
})
export class DashboardModule {}
