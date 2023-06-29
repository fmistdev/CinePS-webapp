import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export abstract class SubscriptionCleaner implements OnDestroy {
  isDestroyed$ = new Subject<boolean>();

  constructor() {}

  ngOnDestroy() {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }
}
