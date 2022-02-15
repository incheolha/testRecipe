import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}

  ngOnInit(): void {
      this.userSub = this.authService.user.subscribe( user => {
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

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
 }
