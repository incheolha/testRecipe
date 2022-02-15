import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
              : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

                return this.authService.user.pipe(
                  take(1),                            // 한번만 실행하도록 함
                  map(user => {
                      const isAuth = !!user;
                  if (isAuth) {
                    return true;
                  }
                  return this.router.createUrlTree(['/auth']);
                }));

                                                            // tap( isAuth => {
                                                            //   if(!isAuth) {
                                                            //     this.router.navigate(['/auth'])
                                                            //   }})
      }

}
