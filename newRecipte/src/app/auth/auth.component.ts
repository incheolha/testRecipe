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
//Dynamic Modal 생성을 Prgrammatic방식으로 구현하기
  private showErrorAlert(message: string) {
// cosnt alertCmp = new AlertComponent() 방식은 앵귤러에서는 작동하지 않느다
//아래방식으로 component Factory resolver롤 사용하고자하는 component를 재가공하여 사용한다
  const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
// 가공되어나온 Component를 어떤 component내 HTML문서에서 elementRef로 사용할것인지 directive를 이용하여생성한다.
// 생성된 placeholder directive를 원하는 html에 ng-template을 사용하여 지정한다
// 이제 지정된 placeholder를 @ViewChild()를 사용하여 poniter를 설정한다
  const hostViewContainerRef = this.alertHost.viewContainerRef;
  //지정된 ContainerRef를 깨끗이청소한다
  hostViewContainerRef.clear();
  //드디어 실제 component factory에 의해 가공된 alertcomponent를 적용하여 생성한다

  const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
  // 현재 위치한 ElementRef지점을 저장한다

  componentRef.instance.message = message;       // @Input binding한 error message를 modal에 보여준다
// modal에 close  버튼을 누르면 현재 열려있는 modal를 subscription을 사용하여 unsubscribe하고
// 현재 containerView를 정리한다

  this.closesub = componentRef.instance.close.subscribe(() => {
    this.closesub.unsubscribe();
    hostViewContainerRef.clear();
  })


  }
}
