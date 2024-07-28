import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild , CanLoad  {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {}


  canLoad(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }

  canActivate(): boolean {
    if(!this.cookieService.check('peligro_gastos_token'))
      {
        window.location.href="/login";
        return false;
      }else
      {
        return true;
      }

  }





}
