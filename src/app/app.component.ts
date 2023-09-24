import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  internetStatus: boolean = false;
  internetStatus$: Subscription = Subscription.EMPTY;

  constructor() {}

  ngOnInit(): void {
    this.checkInternetStatus();
  }

  ngOnDestroy(): void {
    this.internetStatus$.unsubscribe();
  }

  checkInternetStatus() {
    this.internetStatus = navigator.onLine;
    this.internetStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        console.log('status', status);
        this.internetStatus = status;
      });
  }
}