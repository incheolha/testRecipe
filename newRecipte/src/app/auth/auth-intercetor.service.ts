
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, take, map } from 'rxjs/operators';
import { User } from './user.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.store.select('auth').pipe(
        take(1),
        map( authState => {
          return authState.user;
        }),
        exhaustMap( user => {

          if (!user) {                   //user return값이 null이면 기존이 req를 사용하고
                                         // 값이 들어 있으면 param header값을 추가해서 보낸다
            return next.handle(req);
          }
          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', user.token)
          });
          return next.handle(modifiedReq);
        })
      );
  }
}
