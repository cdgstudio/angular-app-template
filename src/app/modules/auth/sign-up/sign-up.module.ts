import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPage } from './components/pages/sign-up/sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpPage,
  },
];

@NgModule({
  declarations: [SignUpPage],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class SignUpModule {}
