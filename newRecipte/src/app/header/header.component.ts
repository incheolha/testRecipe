import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
      this.userSub = this.store.select('auth')
      .pipe( map( authState => {
        return authState.user;
      }))
      .subscribe( user => {
        this.isAuthenticated = !!user          // !user ? false같은 구문
      console.log(!user);
      console.log(!!user);
      });
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
 }
