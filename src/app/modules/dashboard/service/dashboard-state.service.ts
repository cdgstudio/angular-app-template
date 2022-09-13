import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, map, Observable, tap, timer } from 'rxjs';

interface WidgetState {
  type: 'weather' | 'github-stars';
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
    const newState = [...currentState, { type: Math.random() < 0.5 ? 'weather' : 'github-stars' }] as WidgetState[];
    return this.saveState(newState).pipe(tap(() => this.state$.next(newState)));
  }

  private isValidState(state: any): state is WidgetState[] {
    return Array.isArray(state) && state.some((st) => 'type' in st);
  }
}
