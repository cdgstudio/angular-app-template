import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubStarsWidgetEditComponent } from './components/github-stars-widget-edit/github-stars-widget-edit.component';
import { EDIT_WIDGET_COMPONENT } from '../widget';
import { ModalModule } from '../../../../../shared/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { ButtonModule } from '../../../../../shared/button';
import { InputModule } from '../../../../../shared/input';
import { FormColumnModule } from '../../../../../shared/form/form-column';

@NgModule({
  declarations: [GithubStarsWidgetEditComponent],
  imports: [CommonModule, ModalModule, ReactiveFormsModule, A11yModule, ButtonModule, InputModule, FormColumnModule],
  providers: [
    {
      provide: EDIT_WIDGET_COMPONENT,
      useValue: GithubStarsWidgetEditComponent,
    },
  ],
})
export class GithubStarsWidgetEditModule {}
