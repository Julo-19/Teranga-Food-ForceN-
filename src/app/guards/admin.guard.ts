import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AllservicesService } from '../services/allservices.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private allServicesService: AllservicesService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.allServicesService.whoIsOnline() === "admin") {
      return true;
    } else {
      this.allServicesService.message('Oops', 'warning', 'Veuillez vous authentifier en tant que admin');
      this.router.navigate(['/accueil']);
      return false;
    }
  }
}
