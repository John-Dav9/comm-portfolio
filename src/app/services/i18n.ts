import { Injectable, signal, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export type AppLanguage = 'fr' | 'en';

const STORAGE_KEY = 'carnelle-language';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly lang = signal<AppLanguage>('fr');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const params = new URLSearchParams(window.location.search);
      const queryLang = params.get('lang');
      if (queryLang === 'fr' || queryLang === 'en') {
        this.lang.set(queryLang);
      }

      const stored = localStorage.getItem(STORAGE_KEY) as AppLanguage | null;
      if (!queryLang && (stored === 'fr' || stored === 'en')) {
        this.lang.set(stored);
      }

      effect(() => {
        localStorage.setItem(STORAGE_KEY, this.lang());
      });
    }
  }

  setLang(lang: AppLanguage) {
    this.lang.set(lang);
  }
}
