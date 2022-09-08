import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LostPasswordPage } from './components/pages/lost-password/lost-password.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LostPasswordPage,
  },
];

@NgModule({
  declarations: [LostPasswordPage],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class LostPasswordModule {}
