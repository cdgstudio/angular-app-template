import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { DisplayComponent } from './components/display/display.component';
import { IsErrorPipe } from './pipes/is-error.pipe';

const routes: Routes = [{ path: '', component: CalculatorComponent }];

@NgModule({
  declarations: [CalculatorComponent, DisplayComponent, IsErrorPipe],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CalculatorModule {}
