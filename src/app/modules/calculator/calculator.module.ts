import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { DisplayComponent } from './components/display/display.component';

const routes: Routes = [{ path: '', component: CalculatorComponent }];

@NgModule({
  declarations: [CalculatorComponent, DisplayComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CalculatorModule {}
