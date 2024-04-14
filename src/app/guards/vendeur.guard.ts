import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AllservicesService } from '../services/allservices.service';

@Injectable({
  providedIn: 'root'
})
export class VendeurGuard implements CanActivate {

  constructor(
    private router: Router,
    private allServicesService: AllservicesService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.allServicesService.whoIsOnline() === "commercant") {
      return true;
    } else {
      this.allServicesService.message('Oops', 'warning', 'Veuillez vous authentifier en tant que vendeur');
      this.router.navigate(['/accueil']);
      return false;
    }
  }
}
