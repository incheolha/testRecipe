
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { map, switchMap} from 'rxjs/operators';

import * as AuthActions from './auth.action';
import { environment } from 'src/environments/environment.prod';

import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

const handleAuthentication = (email:string, userId: string, token: string, expiresIn) => {

            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const user = new User(email, userId, token, expirationDate);

// auto Login에 필요한 user정보를 localStorage에 저장하기 위한 setting
            localStorage.setItem('userData', JSON.stringify(user));

            return new AuthActions.AuthenticateSuccess({
                        email: email,
                        userId: userId,
                        token: token,
                        expirationDate: expirationDate
                    });
  };

const handleError = (errorRes: any) => {
                            let errorMessage = 'An unknown error occurred!';
                            if (!errorRes.error || !errorRes.error.error) {
                              return of(new AuthActions.AuthenticateFail(errorMessage));
                            }
                            switch (errorRes.error.error.message) {
                              case 'EMAIL_EXISTS':
                                errorMessage = 'This email exists already';
                                break;
                              case 'EMAIL_NOT_FOUND':
                                errorMessage = "This email does no exsit";
                                break;
                              case 'INVALID_PASSWORD':
                                errorMessage = "This Password does no exsit";
                                break;

                            }
                            return of(new AuthActions.AuthenticateFail(errorMessage));
 };

@Injectable()
export class AuthEffects {

  @Effect()
  autoLogin = this.actions$.pipe(
              ofType(AuthActions.AUTOLOGIN),
              map(() => {
                const userData: {
                  email: string;
                  id: string;
                  _token: string;
                  _tokenExpirationDate: string
                } = JSON.parse(localStorage.getItem('userData'));
                if (!userData) {
                  return { type: 'DUMMY' };}
                const loadedUser = new User(
                                              userData.email,
                                              userData.id,
                                              userData._token,
                                              new Date(userData._tokenExpirationDate))
                if(loadedUser.token) {
                  const expirationDuration = new Date(userData._tokenExpirationDate).getTime()
                                                      - new Date().getTime();
                  this.authservice.setLogoutTimer(expirationDuration);
                  return new AuthActions.AuthenticateSuccess({
                    email: loadedUser.id,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate)
                  });
                }
                return { type: 'DUMMY'};
              })
  );

  @Effect()
  authSignup = this.actions$.pipe(
          ofType(AuthActions.SIGNUP_START),
          switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebbaseAPIkey,
              {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
              }
          )
          .pipe(
            tap(resData => {
                this.authservice.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map( resData => {
              return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
          })
  );
  @Effect()
  authLogin = this.actions$.pipe(
          ofType(AuthActions.LOGINSTART),
          switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebbaseAPIkey,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
              }
            )
            .pipe(
              tap(resData => {
                this.authservice.setLogoutTimer(+resData.expiresIn * 1000);
            }),
              map( resData => {

                          return handleAuthentication(resData.email,
                                                      resData.localId,
                                                      resData.idToken,
                                                      +resData.expiresIn);
              }),
              catchError( errorRes => {

                        return handleError(errorRes);

              })
            )
          }
          )
  );

  @Effect({dispatch:false})
  authLogout = this.actions$.pipe(
                                  ofType(AuthActions.LOGOUT),
                                  tap(() => {
                                    this.authservice.clearLogoutTimer();
                                    localStorage.removeItem('userData')
                                    this.router.navigate(['/auth']);
                                  }));


  @Effect({ dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private authservice: AuthService) {}

}
