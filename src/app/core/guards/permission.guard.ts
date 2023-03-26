import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthFacadeService} from "../../pages/auth/auth-facade.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const permissions = route.data['permissions'] as string[];
    console.log(permissions)
    const userPermissions = this.authFacadeService.permissions;

    const hasPermission = userPermissions.some(permission => permissions.includes(permission));
    console.log(hasPermission)
    return hasPermission ? true : this.router.createUrlTree(['/task'])
  }


}
