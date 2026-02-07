import { ChangeDetectionStrategy, Component, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaLibraryService } from '../../services/media-library';
import { MediaUploadService, MediaCategory, MediaItem, MediaType } from '../../services/media-upload';

@Component({
  selector: 'app-media-admin',
  imports: [CommonModule],
  template: `
    <section class="admin-page">
      <header class="admin-header">
        <div>
          <p class="eyebrow">Médiathèque</p>
          <h1>Images, vidéos, audio & documents</h1>
          <p class="lead">{{ mediaItems().length }} fichiers disponibles</p>
        </div>
      </header>

      <div class="media-container">
        <div class="upload-panel">
          <h2>Ajouter un média</h2>
          <div class="field">
            <label for="media-title">Titre du média</label>
            <input
              id="media-title"
              type="text"
              [value]="mediaTitle()"
              (input)="onMediaTitleInput($event)"
              placeholder="Ex: Showreel TV (90s)"
            />
          </div>
          <div class="field">
            <label for="media-category">Catégorie</label>
            <select
              id="media-category"
              [value]="mediaCategory()"
              (change)="onMediaCategoryChange($event)">
              @for (option of mediaCategoryOptions; track option.value) {
                <option [value]="option.value">{{ option.label }}</option>
              }
            </select>
          </div>
          <input 
            #fileInput
            id="media-upload"
            class="visually-hidden"
            type="file" 
            (change)="onFileSelected($event)"
            accept="image/*,video/*,audio/*,application/pdf"
          />
          <button
            class="upload-area"
            type="button"
            (click)="fileInput.click()"
            (dragover)="isDragging.set(true); $event.preventDefault()"
            (dragleave)="isDragging.set(false)"
            (drop)="onFileDrop($event)"
            [class.is-dragging]="isDragging()"
            aria-describedby="upload-help upload-hint">
            <span id="upload-help" class="upload-text">
              Glissez-déposez vos médias ou cliquez pour sélectionner
            </span>
            <span id="upload-hint" class="upload-hint">PNG, JPG, GIF, MP4, MP3, PDF — 50MB max</span>
          </button>
          @if (isUploading()) {
            <div class="progress">
              <div class="progress-bar"></div>
              <p>Téléchargement en cours...</p>
            </div>
          }
          @if (uploadError()) {
            <p class="error" role="alert">{{ uploadError() }}</p>
          }
          @if (uploadSuccess()) {
            <p class="success" role="status">{{ uploadSuccess() }}</p>
          }
        </div>

        <div class="media-grid">
          <h2>Fichiers téléchargés</h2>
          @if (mediaItems().length === 0) {
            <p class="empty">Aucun fichier téléchargé</p>
          } @else {
            <div class="grid">
              @for (item of mediaItems(); track item.id) {
                <div class="media-item">
                  @if (item.type === 'image') {
                    <img [src]="item.url" [alt]="item.title" />
                  } @else if (item.type === 'video') {
                    <video [src]="item.url" controls></video>
                  } @else if (item.type === 'audio') {
                    <audio [src]="item.url" controls></audio>
                  } @else {
                    <div class="doc">
                      <span>PDF</span>
                    </div>
                  }
                  <div class="media-info">
                    <p class="name">{{ item.title }}</p>
                    <p class="type">{{ item.category }} · {{ item.type }}</p>
                  </div>
                  <button 
                    class="button ghost danger" 
                    type="button" 
                    (click)="deleteMedia(item.id)">
                    Supprimer
                  </button>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .admin-page {
      display: grid;
      gap: 2rem;
    }

    .admin-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
    }

    .lead {
      color: var(--muted);
    }

    .media-container {
      display: grid;
      gap: 2rem;
    }

    .upload-panel,
    .media-grid {
      background: var(--surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      padding: 1.6rem;
      display: grid;
      gap: 1rem;
      box-shadow: var(--shadow-sm);
    }

    .field {
      display: grid;
      gap: 0.4rem;
    }

    label {
      font-weight: 600;
      color: var(--ink);
    }

    input,
    select {
      border-radius: var(--radius-sm);
      border: 1px solid rgba(20, 22, 31, 0.2);
      padding: 0.7rem 0.85rem;
      font-family: inherit;
      background: #fff;
    }

    .upload-area {
      border: 2px dashed rgba(20, 22, 31, 0.2);
      border-radius: 16px;
      padding: 3rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      background: transparent;
      width: 100%;
    }

    .upload-area:hover {
      border-color: var(--accent-2);
      background: rgba(42, 157, 143, 0.08);
    }

    .upload-area.is-dragging {
      border-color: var(--accent-2);
      background: rgba(42, 157, 143, 0.12);
    }

    .upload-text {
      font-weight: 600;
      color: var(--ink);
      margin: 0 0 0.5rem;
      display: block;
    }

    .upload-hint {
      color: var(--muted);
      font-size: 0.875rem;
      margin: 0;
      display: block;
    }

    .progress {
      display: grid;
      gap: 0.75rem;
    }

    .progress-bar {
      height: 4px;
      background: rgba(42, 157, 143, 0.25);
      border-radius: 999px;
      overflow: hidden;
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0%, 100% { transform: translateX(-100%); }
      50% { transform: translateX(100%); }
    }

    .error {
      color: #b42318;
      margin: 0;
      padding: 1rem;
      background: rgba(180, 35, 24, 0.12);
      border-radius: var(--radius-sm);
    }

    .success {
      color: #10704a;
      margin: 0;
      padding: 1rem;
      background: rgba(16, 112, 74, 0.12);
      border-radius: var(--radius-sm);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1rem;
    }

    .media-item {
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow: hidden;
      display: grid;
      grid-template-rows: auto 1fr auto;
    }

    .media-item img,
    .media-item video {
      width: 100%;
      height: 160px;
      object-fit: cover;
    }

    .media-item audio {
      width: 100%;
      padding: 0.5rem;
    }

    .doc {
      display: grid;
      place-items: center;
      height: 160px;
      background: var(--surface-alt);
      color: var(--ink);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    .media-info {
      padding: 0.75rem;
      display: grid;
      gap: 0.25rem;
    }

    .name {
      margin: 0;
      font-weight: 600;
      font-size: 0.875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .type {
      margin: 0;
      font-size: 0.75rem;
      color: var(--muted);
      text-transform: uppercase;
    }

    .button {
      padding: 0.5rem 1rem;
      border-radius: 999px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .button.ghost {
      background: rgba(20, 22, 31, 0.06);
      color: var(--ink-soft);
    }

    .button.danger {
      color: #b42318;
    }

    .button.danger:hover {
      background: rgba(180, 35, 24, 0.12);
    }

    .visually-hidden {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    .empty {
      color: var(--muted);
      text-align: center;
      padding: 3rem;
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaAdmin {
  private readonly mediaUploadService = inject(MediaUploadService);
  private readonly mediaLibrary = inject(MediaLibraryService);

  readonly mediaItems = computed(() => this.mediaLibrary.items());
  readonly mediaTitle = signal('');
  readonly mediaCategory = signal<MediaCategory>('press-photo');

  readonly mediaCategoryOptions = [
    { value: 'press-photo', label: 'Photo presse' },
    { value: 'event-photo', label: 'Photo événement' },
    { value: 'showreel', label: 'Showreel vidéo' },
    { value: 'audio', label: 'Extrait audio' },
    { value: 'publication-pdf', label: 'Publication PDF' },
    { value: 'partner', label: 'Média partenaire' },
    { value: 'other', label: 'Autre' }
  ];

  readonly isUploading = signal(false);
  readonly isDragging = signal(false);
  readonly uploadError = signal('');
  readonly uploadSuccess = signal('');

  constructor() {
    effect((onCleanup) => {
      if (this.uploadSuccess()) {
        const timeoutId = setTimeout(() => this.uploadSuccess.set(''), 3000);
        onCleanup(() => clearTimeout(timeoutId));
      }
    });

    effect((onCleanup) => {
      if (this.uploadError()) {
        const timeoutId = setTimeout(() => this.uploadError.set(''), 5000);
        onCleanup(() => clearTimeout(timeoutId));
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.uploadFile(input.files[0]);
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    
    if (event.dataTransfer?.files?.length) {
      this.uploadFile(event.dataTransfer.files[0]);
    }
  }

  private uploadFile(file: File) {
    if (!this.isValidFile(file)) {
      this.uploadError.set('Format ou taille de fichier invalide');
      return;
    }

    this.isUploading.set(true);
    this.uploadError.set('');

    this.mediaUploadService.uploadImagePromise(file, 'media').then(
      (url) => {
        const type = this.getMediaType(file.type);
        const newItem: MediaItem = {
          id: `${Date.now()}-${file.name}`,
          name: file.name,
          title: this.mediaTitle().trim() || file.name,
          description: '',
          url: url,
          uploadedAt: Date.now(),
          type: type,
          category: this.mediaCategory()
        };

        this.mediaLibrary.addItem(newItem);
        this.uploadSuccess.set(`${file.name} téléchargé avec succès`);
        this.isUploading.set(false);
        this.mediaTitle.set('');
      },
      (error) => {
        console.error('Upload error:', error);
        this.uploadError.set('Erreur lors du téléchargement');
        this.isUploading.set(false);
      }
    );
  }

  private isValidFile(file: File): boolean {
    const validTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'video/mp4',
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'application/pdf'
    ];
    const maxSize = 50 * 1024 * 1024; // 50MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  }

  private getMediaType(mime: string): MediaType {
    if (mime.startsWith('image/')) {
      return 'image';
    }
    if (mime.startsWith('video/')) {
      return 'video';
    }
    if (mime.startsWith('audio/')) {
      return 'audio';
    }
    return 'document';
  }

  onMediaTitleInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (!target) {
      return;
    }
    this.mediaTitle.set(target.value);
  }

  onMediaCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (!target) {
      return;
    }
    this.mediaCategory.set(target.value as MediaCategory);
  }

  deleteMedia(id: string) {
    this.mediaLibrary.removeItem(id);
  }
}
