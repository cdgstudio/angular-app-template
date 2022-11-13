import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YtChannelStatisticsEditComponent } from './components/yt-channel-statistics-edit/yt-channel-statistics-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../../../../shared/modal';
import { A11yModule } from '@angular/cdk/a11y';
import { ButtonModule } from '../../../../shared/button';
import { InputModule } from '../../../../shared/input';
import { FormColumnModule } from '../../../../shared/form/form-column';
import { EDIT_WIDGET_COMPONENT } from '@cdgstudio/dashboard';

@NgModule({
  declarations: [YtChannelStatisticsEditComponent],
  imports: [CommonModule, ReactiveFormsModule, ModalModule, A11yModule, ButtonModule, InputModule, FormColumnModule],
  providers: [
    {
      provide: EDIT_WIDGET_COMPONENT,
      useValue: YtChannelStatisticsEditComponent,
    },
  ],
})
export class YtChannelStatisticsEditModule {}
