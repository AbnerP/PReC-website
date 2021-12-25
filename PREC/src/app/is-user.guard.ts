import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserGuard implements CanActivate {

  constructor(private securityService:SecurityService,
    private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.securityService.getRole() === 'admin' || this.securityService.getRole() === 'user'){
        return true;
      }

      this.router.navigate(['/login']);
      return false;
  }

}
