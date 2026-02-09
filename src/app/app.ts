import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { I18nService } from './services/i18n';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SiteContentService } from './services/site-content';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly i18n = inject(I18nService);
  private readonly siteContent = inject(SiteContentService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly title = signal('comm-portfolio');
  readonly isMenuOpen = signal(false);
  readonly currentLang = computed(() => this.i18n.lang());
  readonly header = computed(() => this.siteContent.current().header);
  readonly footer = computed(() => this.siteContent.current().footer);
  readonly previewMode = computed(() => this.siteContent.previewMode());
  readonly theme = computed(() => this.siteContent.current().theme || 'sable');

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      document.documentElement.dataset['theme'] = this.theme();
    });
  }

  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  setLang(lang: 'fr' | 'en') {
    this.i18n.setLang(lang);
  }

  exitPreview() {
    this.siteContent.clearPreview();
    const url = new URL(window.location.href);
    url.searchParams.delete('preview');
    url.searchParams.delete('lang');
    this.router.navigateByUrl(url.pathname + url.search);
  }
}
