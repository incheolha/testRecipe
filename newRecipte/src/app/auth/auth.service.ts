import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

// firebase에서 return한 response값을 class로 재설정함

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);  // BehaviorSubject 과 Subject 차이점
                                            // BehaviorSubject -- 이전 결과값과 현 결과값을 동시에 받고자 할때 사용
                                            // Subject-- 현제 결과값만 받음

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
  return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxAUy-pnfT2IaWaLXCJvRcM8TZDcQhs1k',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
    )
    .pipe(catchError(this.errorHandle),
          tap(resData => {
            this.handleAuthentication(
                        resData.email, resData.localId, resData.idToken, +resData.expiresIn
              );
          })
    );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(
                                  userData.email,
                                  userData.id,
                                  userData._token,
                                  new Date(userData._tokenExpirationDate)
    )
    if(loadedUser.token) {
      this.user.next(loadedUser);
      // firebase에서 가져온 토큰만료 시간을 number로 변환하고 현재 날짜의 시간으로 number로 변환후 빼면 expirationDuration
      // 시간이 나오고 이것을 parameter값으로 지정한다
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }


  autoLogout(expirationDuration: number) {
  console.log(expirationDuration);
  this.tokenExpirationTimer =  setTimeout(() => {
                                                    this.logout();
                                                  }, expirationDuration)

  }

  login(email:string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxAUy-pnfT2IaWaLXCJvRcM8TZDcQhs1k',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.errorHandle),
          tap(resData => {
            this.handleAuthentication(
                        resData.email, resData.localId, resData.idToken, +resData.expiresIn
              );
          })
    );
   }

   //사용자 인증을 한후 내용물을 저장하고자 할때 사용
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,userId, token, expirationDate);
    this.user.next(user);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }


  private errorHandle( errorRes: HttpErrorResponse ) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError( () => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email does no exsit";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "This email does no exsit";
        break;

    }
    return throwError( () => errorMessage);
  }
}
