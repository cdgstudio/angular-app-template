import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './components/pages/login/login.page';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage,
      },
    ]),
    A11yModule,
  ],
})
export class LoginModule {}
