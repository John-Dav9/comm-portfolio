import { inject, Injectable, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SupabaseService } from './supabase';
import { I18nService } from './i18n';
import type { Language } from '../data/site-content';

export type ArticleStatus = 'draft' | 'published';

export interface ArticleLocale {
  title: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface ArticleRecord {
  id: string;
  status: ArticleStatus;
  sortIndex: number;
  content: Record<Language, ArticleLocale>;
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly supabase = inject(SupabaseService).client;
  private readonly i18n = inject(I18nService);
  readonly items = signal<ArticleRecord[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      void this.refresh();
    }
  }

  getForLang(lang: Language = this.i18n.lang(), includeDrafts = false) {
    return this.items()
      .filter((item) => includeDrafts || item.status === 'published')
      .sort((a, b) => a.sortIndex - b.sortIndex)
      .map((item) => item.content[lang]);
  }

  async refresh() {
    const { data, error } = await this.supabase
      .from('articles')
      .select('*')
      .order('sort_index', { ascending: true });

    if (error || !data) {
      return;
    }

    this.items.set(
      data.map((row) => ({
        id: row.id,
        status: row.status as ArticleStatus,
        sortIndex: row.sort_index as number,
        content: row.content as Record<Language, ArticleLocale>
      }))
    );
  }

  async add(record: Omit<ArticleRecord, 'id'>) {
    const { data, error } = await this.supabase
      .from('articles')
      .insert({
        status: record.status,
        sort_index: record.sortIndex,
        content: record.content
      })
      .select()
      .single();

    if (error || !data) {
      return null;
    }

    const created: ArticleRecord = {
      id: data.id,
      status: data.status,
      sortIndex: data.sort_index,
      content: data.content
    };
    this.items.update((current) => [...current, created]);
    return created;
  }

  async update(record: ArticleRecord) {
    const { error } = await this.supabase
      .from('articles')
      .update({
        status: record.status,
        sort_index: record.sortIndex,
        content: record.content
      })
      .eq('id', record.id);

    if (error) {
      return false;
    }

    this.items.update((current) =>
      current.map((item) => (item.id === record.id ? record : item))
    );
    return true;
  }

  async remove(id: string) {
    const { error } = await this.supabase.from('articles').delete().eq('id', id);
    if (error) {
      return false;
    }
    this.items.update((current) => current.filter((item) => item.id !== id));
    return true;
  }
}
