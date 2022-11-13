import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { WidgetStateInterface } from '../models/widget';
import { DashboardStateService } from './dashboard-store.service';

@Injectable()
export class DashboardService {
  state$ = new ReplaySubject<WidgetStateInterface[]>(1);

  constructor(private dashboardStateService: DashboardStateService) {}

  restoreState() {
    return this.dashboardStateService.restoreState().pipe(tap((newState) => this.state$.next(newState)));
  }

  addWidget(type: string): Observable<void> {
    return this.state$.pipe(
      take(1),
      map((currentState) => [...currentState, { id: this.randomString(), type }] as WidgetStateInterface[]),
      switchMap((newState) => this.setNewState(newState)),
    );
  }

  removeWidget(id: string): Observable<void> {
    return this.state$.pipe(
      take(1),
      map((oldState) => oldState.filter((state) => state.id !== id)),
      switchMap((newState) => this.setNewState(newState)),
    );
  }

  updateWidgetState(id: string, newData: unknown): Observable<void> {
    return this.state$.pipe(
      take(1),
      map((oldState) => this.overrideWidgetData(oldState, id, newData)),
      switchMap((newState) => this.setNewState(newState)),
    );
  }

  private randomString(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  private overrideWidgetData(oldState: WidgetStateInterface[], id: string, newData: unknown): WidgetStateInterface[] {
    return oldState.map((item) => (item.id === id ? { id: id, type: item.type, data: newData } : item));
  }

  private setNewState(newState: WidgetStateInterface[]): Observable<void> {
    return this.dashboardStateService.setNewState(newState).pipe(tap(() => this.state$.next(newState)));
  }
}
