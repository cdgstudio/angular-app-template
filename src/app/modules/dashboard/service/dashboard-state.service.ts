import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, map, Observable, take, tap, timer } from 'rxjs';

interface WidgetState {
  type: 'weather' | 'github-stars';
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  state$ = new BehaviorSubject<WidgetState[]>([]);

  constructor() {
    try {
      const oldStateString = window.localStorage.getItem('dashboard_state') ?? '';
      const olsState = JSON.parse(oldStateString);
      if (this.isValidState(olsState)) {
        this.state$.next(olsState);
      }
    } catch {}
  }

  saveState(state: any): Observable<void> {
    return defer(() => {
      window.localStorage.setItem('dashboard_state', JSON.stringify(state));
      return timer(500);
    }).pipe(map(() => void 0));
  }

  addRandomWidget(): Observable<void> {
    const currentState = this.state$.getValue();
    const type = Math.random() < 0.5 ? 'weather' : ('github-stars' as const);
    const newState = [
      ...currentState,
      { type, data: type === 'weather' ? { city: 'Warsaw' } : void 0 },
    ] as WidgetState[];
    return this.saveState(newState).pipe(tap(() => this.state$.next(newState)));
  }

  updateWidgetState(widget: any, newData: any): Observable<void> {
    return this.state$.pipe(
      take(1),
      tap((currentState) => {
        const newState = currentState.map((item) => (item === widget ? newData : item));
        this.saveState(newState).subscribe();
        this.state$.next(newState);
      }),
      map(() => void 0),
    );
  }

  private isValidState(state: any): state is WidgetState[] {
    return Array.isArray(state) && state.some((st) => 'type' in st);
  }
}
