import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, map, Observable, switchMap, take, tap, timer } from 'rxjs';
import { WidgetId } from '../modules/widgets/widget';

export interface WidgetState<T = undefined> {
  readonly type: 'weather' | 'github-stars';
  readonly id: string;
  data: T;
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
    const type = Math.random() < 0.75 ? 'weather' : ('github-stars' as const);
    const newState = [
      ...currentState,
      { id: this.randomString(), type, data: type === 'weather' ? { city: 'Warsaw' } : void 0 },
    ] as WidgetState[];
    return this.saveState(newState).pipe(tap(() => this.state$.next(newState)));
  }

  removeWidget(id: WidgetId): Observable<void> {
    return this.state$.pipe(
      take(1),
      map((oldState) => oldState.filter((state) => state.id !== id)),
      tap((newState) => this.state$.next(newState)),
      switchMap((newState) => this.saveState(newState)),
    );
  }

  updateWidgetState(id: WidgetId, newData: unknown): Observable<void> {
    return this.state$.pipe(
      take(1),
      map((oldState) =>
        oldState.map((item) =>
          item.id === id
            ? {
                id: id,
                type: item.type,
                data: newData,
              }
            : item,
        ),
      ),
      tap((newState) => this.state$.next(newState as any)),
      switchMap((newState) => this.saveState(newState)),
      map(() => void 0),
    );
  }

  private isValidState(state: any): state is WidgetState[] {
    return Array.isArray(state) && state.every((st) => !!(st as WidgetState).id && !!(st as WidgetState).type);
  }

  private randomString(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }
}
