import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalcEngine } from '../../facades/calc.engine';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  providers: [CalcEngine],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  display$ = new BehaviorSubject<string>('');

  constructor(private calcEngine: CalcEngine) {}

  addToDisplay(value: string | number): void {
    this.calcEngine.pushToInput(value);
  }

  calculate() {
    this.calcEngine.calculate().subscribe();
  }
}
