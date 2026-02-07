import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

interface User {
  email?: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  // For development: mock user$ stream until Firebase is configured
  readonly user$: Observable<User | null> = of(null);

  login(email: string, password: string) {
    // Mock login for development - replace with real Firebase when configured
    if (email && password.length >= 8) {
      this.currentUser = {
        email: email,
        uid: 'mock-user-' + Math.random().toString(36).substr(2, 9)
      };
      return Promise.resolve(this.currentUser);
    }
    return Promise.reject(new Error('Invalid credentials'));
  }

  logout() {
    this.currentUser = null;
    return Promise.resolve();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}
