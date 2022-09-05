import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalcEngine } from '../../facades/calc.engine';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent {
  input$ = this.calcEngine.input$;
  invalid$ = this.calcEngine.lastCalculate$;

  constructor(private calcEngine: CalcEngine) {}

  setInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.calcEngine.setInput(target.value);
    this.calcEngine.calculate().subscribe();
  }
}
