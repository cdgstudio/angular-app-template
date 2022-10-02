import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './components/pages/dashboard/dashboard.page';
import { RouterModule, Routes } from '@angular/router';
import { WidgetLoaderDirective } from './directives/widget-loader.directive';
import { WidgetSelectionComponent } from './components/widget-selection/widget-selection.component';
import { ModalModule } from '../../shared/modal';

const routes: Routes = [{ path: '', component: DashboardPage }];

@NgModule({
  declarations: [DashboardPage, WidgetLoaderDirective, WidgetSelectionComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ModalModule],
})
export class DashboardModule {}
