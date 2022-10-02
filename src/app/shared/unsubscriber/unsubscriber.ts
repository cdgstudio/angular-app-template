import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable()
export class Unsubscriber extends Subject<void> implements OnDestroy {
  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}

@Component({
  selector: '',
  template: '',
  providers: [Unsubscriber],
})
export class MyComponent implements OnInit {
  private emitter$!: Observable<unknown>;
  constructor(private unsubscriber: Unsubscriber) {}

  ngOnInit(): void {
    this.emitter$.pipe(takeUntil(this.unsubscriber)).subscribe();
  }
}
