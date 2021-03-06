import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService} from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  closesub: Subscription;
  storeSub: Subscription;

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select('auth').subscribe( authState => {

      this.isLoading = authState.loading;
      this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
    });

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
   if ( !form.valid ) {
     return;
   }
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;



    if ( this.isLoginMode ) {
      console.log('login click');
        // authObserable = this.authService.login(email, password);
        this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));

    } else {
      this.store.dispatch(
                          new AuthActions.SignupStart({email: email, password: password})
                          )
    }

        form.reset();

  }
// modal window closing function

onHandleEror() {
  this.store.dispatch(new AuthActions.ClearError());
 }

 ngOnDestroy(): void {

  if ( this.closesub) {
    this.closesub.unsubscribe();
  }
  if (this.storeSub) {
    this.storeSub.unsubscribe();
  }
 }
//Dynamic Modal ????????? Prgrammatic???????????? ????????????
  private showErrorAlert(message: string) {
// cosnt alertCmp = new AlertComponent() ????????? ?????????????????? ???????????? ?????????
//?????????????????? component Factory resolver??? ????????????????????? component??? ??????????????? ????????????
  const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
// ?????????????????? Component??? ?????? component??? HTML???????????? elementRef??? ?????????????????? directive??? ????????????????????????.
// ????????? placeholder directive??? ????????? html??? ng-template??? ???????????? ????????????
// ?????? ????????? placeholder??? @ViewChild()??? ???????????? poniter??? ????????????
  const hostViewContainerRef = this.alertHost.viewContainerRef;
  //????????? ContainerRef??? ?????????????????????
  hostViewContainerRef.clear();
  //????????? ?????? component factory??? ?????? ????????? alertcomponent??? ???????????? ????????????

  const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
  // ?????? ????????? ElementRef????????? ????????????

  componentRef.instance.message = message;       // @Input binding??? error message??? modal??? ????????????
// modal??? close  ????????? ????????? ?????? ???????????? modal??? subscription??? ???????????? unsubscribe??????
// ?????? containerView??? ????????????

  this.closesub = componentRef.instance.close.subscribe(() => {
    this.closesub.unsubscribe();
    hostViewContainerRef.clear();
  })


  }
}
