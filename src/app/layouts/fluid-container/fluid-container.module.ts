import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluidContainerComponent } from './components/fluid-container/fluid-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FluidContainerComponent],
  imports: [CommonModule, RouterModule],
  exports: [FluidContainerComponent],
})
export class FluidContainerModule {}
