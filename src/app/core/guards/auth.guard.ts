import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacadeService } from 'src/app/pages/auth/auth-facade.service';
import {take, map} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authFacadeService.token$
      .pipe(
        take(1),
        map (token => {
          if(token) {
            return true
          }
          return this.router.createUrlTree(['auth/login'])
        }
      ))

  }
}
