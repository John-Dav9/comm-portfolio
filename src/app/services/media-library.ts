import { inject, Injectable, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import type { MediaItem, MediaType, MediaCategory } from './media-upload';

const STORAGE_KEY = 'carnelle-media-library';

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
  readonly items = signal<MediaItem[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as MediaItem[];
          this.items.set(parsed);
        } catch {
          this.items.set(seedItems);
        }
      } else {
        this.items.set(seedItems);
      }

      effect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
      });
    } else {
      this.items.set(seedItems);
    }
  }

  addItem(item: MediaItem) {
    this.items.update((current) => [item, ...current]);
  }

  removeItem(id: string) {
    this.items.update((current) => current.filter((item) => item.id !== id));
  }

  getByCategory(category: MediaCategory) {
    return this.items().filter((item) => item.category === category);
  }

  getByType(type: MediaType) {
    return this.items().filter((item) => item.type === type);
  }
}
