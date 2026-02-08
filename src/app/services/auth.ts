import { Injectable, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SupabaseService } from './supabase';

interface User {
  email: string | null;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly supabase = inject(SupabaseService).client;
  readonly user = signal<User | null>(null);
  readonly ready = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      void this.init();
    }
  }

  private async init() {
    const { data } = await this.supabase.auth.getSession();
    this.user.set(
      data.session?.user
        ? { email: data.session.user.email ?? null, uid: data.session.user.id }
        : null
    );
    this.ready.set(true);

    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.user.set(
        session?.user ? { email: session.user.email ?? null, uid: session.user.id } : null
      );
    });
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error || !data.user) {
      const message = error?.message ?? 'Identifiants invalides';
      throw new Error(message);
    }
    this.user.set({ email: data.user.email ?? null, uid: data.user.id });
    return data.user;
  }

  async logout() {
    await this.supabase.auth.signOut();
    this.user.set(null);
  }

  getCurrentUser(): User | null {
    return this.user();
  }

  isAuthenticated(): boolean {
    return this.user() !== null;
  }

  async ensureSession(): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    if (this.ready()) {
      return this.isAuthenticated();
    }

    const { data } = await this.supabase.auth.getSession();
    this.user.set(
      data.session?.user ? { email: data.session.user.email ?? null, uid: data.session.user.id } : null
    );
    this.ready.set(true);
    return this.isAuthenticated();
  }
}
