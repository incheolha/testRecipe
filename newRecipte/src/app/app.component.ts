import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LogginngService } from './logging.service';

import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private loggingService: LogginngService,
              private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
      // this.authService.autoLogin();
      this.loggingService.printLog('Hello from AppComponent on ngOnInit...');
  }

}
