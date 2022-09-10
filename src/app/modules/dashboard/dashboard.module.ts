import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './components/pages/dashboard/dashboard.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: DashboardPage }];

@NgModule({
  declarations: [DashboardPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
