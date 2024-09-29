import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ThankYouGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isNavigatedFromRegistration = sessionStorage.getItem('fromRegistration') === 'true';

    if (isNavigatedFromRegistration) {
      sessionStorage.removeItem('fromRegistration');
      return true;
    } else {
      this.router.navigate(['/']); // Redirect to home or any other page
      return false;
    }
  }
}
