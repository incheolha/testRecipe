import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] Login'       //'LOGIN';
export const AUTHENTICATE_FAIL = '[Auth] Login fail';

export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';

export const LOGINSTART = '[Auth] Login start';
export const LOGOUT = '[Auth] Logout'     // 'LOGOUT';

export const AUTOLOGIN = '[Auth] Auto Login';
export const AUTOLOGOUT = '[Auth] Auto Logout';

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}


export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor( public payload: {email: string, password: string}){}
}
export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor( public payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean
  }){}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGINSTART;
  constructor(public payload: { email: string, password: string }){}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string){}
}

export class AutoLogin implements Action {
  readonly type = AUTOLOGIN;
}

export type AuthActions = AuthenticateSuccess
          | AuthenticateFail
          | SignupStart
          | LoginStart
          | Logout
          | ClearError
          | AutoLogin
          
          ;

