import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, Observable, of, ReplaySubject, Subject, throwError } from 'rxjs';

@Injectable()
export class CalcEngine {
  private input$$ = new BehaviorSubject<string>('');
  input$ = this.input$$.asObservable();
  private lastCalculate$$ = new ReplaySubject<string | Error>(1);
  lastCalculate$ = this.lastCalculate$$.asObservable();

  private resetDisplay = false;

  setInput(input: string | number): void {
    const text = typeof input === 'string' ? input : input.toString();
    this.input$$.next(text);
  }

  pushToInput(input: string | number): void {
    if (this.resetDisplay === true) {
      this.resetDisplay = false;
      this.input$$.next('');
      this.lastCalculate$$.next('');
    }

    const text = typeof input === 'string' ? input : input.toString();
    const currentValue = this.input$$.getValue();

    this.input$$.next(currentValue + text);
  }

  calculate(): Observable<string> {
    return defer(() => {
      const input = this.input$$.getValue();
      try {
        const result = eval(input);
        this.lastCalculate$$.next(result);
        return of(result);
      } catch (e) {
        if (e instanceof Error) {
          this.lastCalculate$$.next(e);
        } else if (typeof e === 'string') {
          this.lastCalculate$$.next(new Error(e));
        }
        return throwError(() => e);
      } finally {
        this.resetDisplay = true;
      }
    });
  }
}
