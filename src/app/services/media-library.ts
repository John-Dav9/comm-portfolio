import { inject, Injectable, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import type { MediaItem, MediaType, MediaCategory } from './media-upload';
import { SupabaseService } from './supabase';

const seedItems: MediaItem[] = [
  {
    id: 'press-photo-001',
    name: 'Portrait presse studio',
    title: 'Portrait presse studio',
    description: 'Portrait lumineux, format portrait.',
    url: 'https://via.placeholder.com/800x1000',
    uploadedAt: Date.now(),
    type: 'image',
    category: 'press-photo'
  },
  {
    id: 'press-photo-002',
    name: 'Portrait scène',
    title: 'Portrait scène',
    description: 'Photo en situation événementielle.',
    url: 'https://via.placeholder.com/1200x800',
    uploadedAt: Date.now(),
    type: 'image',
    category: 'event-photo'
  },
  {
    id: 'showreel-001',
    name: 'Showreel TV',
    title: 'Showreel TV (90s)',
    description: 'Extraits TV, passages plateau et interviews.',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadedAt: Date.now(),
    type: 'video',
    category: 'showreel'
  },
  {
    id: 'audio-001',
    name: 'Chronique radio',
    title: 'Chronique radio - actualité',
    description: 'Extrait audio de 45 secondes.',
    url: 'https://www.w3schools.com/html/horse.mp3',
    uploadedAt: Date.now(),
    type: 'audio',
    category: 'audio'
  },
  {
    id: 'pdf-001',
    name: 'Article PDF',
    title: 'Article publié - dossier société',
    description: 'Version PDF à télécharger.',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    uploadedAt: Date.now(),
    type: 'document',
    category: 'publication-pdf'
  },
  {
    id: 'partner-001',
    name: 'Média partenaire',
    title: 'Média partenaire',
    description: 'Espace pour un logo ou un nom de média.',
    url: 'https://via.placeholder.com/600x300',
    uploadedAt: Date.now(),
    type: 'image',
    category: 'partner'
  }
];

@Injectable({
  providedIn: 'root'
})
export class MediaLibraryService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly supabase = inject(SupabaseService).client;
  readonly items = signal<MediaItem[]>([]);

  constructor() {
    this.items.set(seedItems);
    if (isPlatformBrowser(this.platformId)) {
      void this.refresh();
    }
  }

  async refresh() {
    const { data, error } = await this.supabase
      .from('media_items')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error || !data) {
      return;
    }

    const mapped = data.map((row) => this.mapRow(row));
    this.items.set(mapped);
  }

  async addItem(item: Omit<MediaItem, 'id'>) {
    const { data, error } = await this.supabase
      .from('media_items')
      .insert({
        name: item.name,
        title: item.title,
        description: item.description,
        url: item.url,
        path: item.path ?? null,
        uploaded_at: new Date(item.uploadedAt).toISOString(),
        type: item.type,
        category: item.category
      })
      .select()
      .single();

    if (error || !data) {
      return null;
    }

    const mapped = this.mapRow(data);
    this.items.update((current) => [mapped, ...current]);
    return mapped;
  }

  async removeItem(id: string) {
    const item = this.items().find((current) => current.id === id);
    if (!item) {
      return;
    }

    if (item.path) {
      await this.supabase.storage.from('media').remove([item.path]);
    }

    await this.supabase.from('media_items').delete().eq('id', id);
    this.items.update((current) => current.filter((currentItem) => currentItem.id !== id));
  }

  getByCategory(category: MediaCategory) {
    return this.items().filter((item) => item.category === category);
  }

  getByType(type: MediaType) {
    return this.items().filter((item) => item.type === type);
  }

  private mapRow(row: {
    id: string;
    name: string;
    title: string;
    description: string;
    url: string;
    path: string | null;
    uploaded_at: string;
    type: MediaType;
    category: MediaCategory;
  }): MediaItem {
    return {
      id: row.id,
      name: row.name,
      title: row.title,
      description: row.description,
      url: row.url,
      path: row.path ?? undefined,
      uploadedAt: Date.parse(row.uploaded_at),
      type: row.type,
      category: row.category
    };
  }
}
