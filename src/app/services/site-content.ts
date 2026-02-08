import { inject, Injectable, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SupabaseService } from './supabase';
import { I18nService } from './i18n';
import { DEFAULT_SITE_CONTENT, type LocalizedSiteContent, type SiteContent } from '../data/site-content';

@Injectable({
  providedIn: 'root'
})
export class SiteContentService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly previewKey = 'site_content_preview';

  private readonly content = signal<LocalizedSiteContent>(DEFAULT_SITE_CONTENT);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly previewMode = signal(false);

  readonly current = computed<SiteContent>(() => {
    const lang = this.i18n.lang();
    return lang === 'fr' ? this.content().fr : this.content().en;
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.previewMode.set(this.isPreviewEnabled());
      if (this.previewMode()) {
        const preview = this.readPreview();
        if (preview) {
          this.content.set(preview);
        }
        window.addEventListener('storage', (event) => {
          if (event.key === this.previewKey && event.newValue) {
            try {
              this.content.set(JSON.parse(event.newValue) as LocalizedSiteContent);
            } catch {
              // ignore parse errors
            }
          }
        });
      }
      void this.load();
    }
  }

  getRawContent() {
    return this.content();
  }

  async load() {
    this.loading.set(true);
    this.error.set(null);

    const { data, error } = await this.supabase
      .from('site_content')
      .select('content')
      .eq('key', 'default')
      .maybeSingle();

    if (error) {
      this.error.set('Impossible de charger le contenu.');
      this.loading.set(false);
      return;
    }

    if (data?.content) {
      this.content.set(data.content as LocalizedSiteContent);
    }

    if (this.previewMode()) {
      const preview = this.readPreview();
      if (preview) {
        this.content.set(preview);
      }
    }

    this.loading.set(false);
  }

  async save(nextContent: LocalizedSiteContent) {
    this.content.set(nextContent);
    const { error } = await this.supabase
      .from('site_content')
      .upsert({ key: 'default', content: nextContent }, { onConflict: 'key' });

    if (error) {
      this.error.set('Impossible de sauvegarder le contenu.');
      return false;
    }

    return true;
  }

  async updateLanguage(lang: 'fr' | 'en', content: SiteContent) {
    const current = this.content();
    const next = {
      ...current,
      [lang]: content
    } satisfies LocalizedSiteContent;
    return this.save(next);
  }

  setPreview(nextContent: LocalizedSiteContent) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(this.previewKey, JSON.stringify(nextContent));
  }

  clearPreview() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.removeItem(this.previewKey);
  }

  private readPreview() {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const raw = localStorage.getItem(this.previewKey);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as LocalizedSiteContent;
    } catch {
      return null;
    }
  }

  private isPreviewEnabled() {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const params = new URLSearchParams(window.location.search);
    return params.get('preview') === '1';
  }
}
