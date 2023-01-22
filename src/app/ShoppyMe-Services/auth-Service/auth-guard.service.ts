import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //check condition  
    if (sessionStorage.getItem('userName')==null) {
      alert('Please login to view this page');
      //return false to cancel the navigation
      this._router.navigate(['/home'])
      return false;
    }
    return true;
  }

}
