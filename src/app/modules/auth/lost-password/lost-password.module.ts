import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LostPasswordPage } from './components/pages/lost-password/lost-password.page';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

const routes: Routes = [
  {
    path: '',
    component: LostPasswordPage,
  },
];

@NgModule({
  declarations: [LostPasswordPage],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, A11yModule],
})
export class LostPasswordModule {}
