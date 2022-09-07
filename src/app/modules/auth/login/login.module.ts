import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './components/pages/login/login.page';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
})
export class LoginModule {}
