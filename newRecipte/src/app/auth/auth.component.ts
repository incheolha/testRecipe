import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;

  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

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

    let authObserable: Observable<AuthResponseData>;

    if ( this.isLoginMode ) {
      console.log('login click');
        authObserable = this.authService.login(email, password);
    } else {
       authObserable = this.authService.signup(email, password);
    }

    authObserable.subscribe( {

      next: (responseData) => {

            console.log(responseData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
      complete: () => console.info('complete')
    })


    // rxjx구버전으로 subscribe에 적용하는 예제
          //   responseData => {
          //   console.log(responseData);
          //   this.isLoading = false;
          // },
          //   errorMessage => {
          //     console.log(errorMessage);
          //     this.error = errorMessage;
          //     this.isLoading = false;
          //   }

        form.reset();

  }
}
