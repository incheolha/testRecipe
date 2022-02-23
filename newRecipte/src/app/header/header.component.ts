import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipesActions from '../recipes/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

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
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }
  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
    // this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut() {
      this.store.dispatch(new AuthActions.Logout());
    // this.store.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
 }
