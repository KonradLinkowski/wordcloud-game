import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class LogoutGuard implements CanActivate {

  constructor(
    private authService: LoginService,
    private router: Router
  ) {}

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
