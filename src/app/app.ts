import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from './services/i18n';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly i18n = inject(I18nService);
  protected readonly title = signal('comm-portfolio');
  readonly isMenuOpen = signal(false);
  readonly currentLang = computed(() => this.i18n.lang());

  readonly navLabels = computed(() => {
    const lang = this.i18n.lang();
    if (lang === 'fr') {
      return {
        home: 'Accueil',
        about: 'À propos',
        projects: 'Projets',
        blog: 'Journal',
        contact: 'Contact',
        admin: 'Espace admin'
      };
    }
    return {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      blog: 'Journal',
      contact: 'Contact',
      admin: 'Admin'
    };
  });

  readonly footerLabels = computed(() => {
    const lang = this.i18n.lang();
    if (lang === 'fr') {
      return {
        rights: 'Tous droits réservés.',
        contact: 'Contact presse'
      };
    }
    return {
      rights: 'All rights reserved.',
      contact: 'Press contact'
    };
  });

  readonly brandSubtitle = computed(() => {
    const lang = this.i18n.lang();
    return lang === 'fr'
      ? 'Communication · Journalisme · Présentation média'
      : 'Communication · Journalism · Media presentation';
  });

  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  setLang(lang: 'fr' | 'en') {
    this.i18n.setLang(lang);
  }
}
