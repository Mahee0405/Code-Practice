import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.loggin() === true) {
      console.log(this.authService.loggin());
      return true;
    }
    this.alertifyService.error('Please login to proceed ...');
    this.router.navigate(['/home']);
    return false;
  }
}
