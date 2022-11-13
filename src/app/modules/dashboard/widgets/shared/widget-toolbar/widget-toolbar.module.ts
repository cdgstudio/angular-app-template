import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetToolbarComponent } from './components/widget-toolbar/widget-toolbar.component';

@NgModule({
  declarations: [WidgetToolbarComponent],
  imports: [CommonModule],
  exports: [WidgetToolbarComponent],
})
export class WidgetToolbarModule {}
