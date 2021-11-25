import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
  private readonly STORAGE_KEY = 'cloud_current-user';
  currentUser = new BehaviorSubject<string | null>(null);

  constructor(private readonly router: Router) {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.currentUser.next(stored);
    }
    this.currentUser.subscribe(value => {
      if (!value) {
        this.router.navigate(['login']);
      }
    })
  }

  getUsername() {
    return this.currentUser.value;
  }

  isLoggedIn(): boolean {
    return this.currentUser.value !== null;
  }

  login(username: string) {
    localStorage.setItem(this.STORAGE_KEY, username);
    this.currentUser.next(username);
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUser.next(null);
  }
}