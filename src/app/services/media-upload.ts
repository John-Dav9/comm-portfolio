import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

export type MediaType = 'image' | 'video' | 'audio' | 'document';
export type MediaCategory =
  | 'press-photo'
  | 'event-photo'
  | 'showreel'
  | 'publication-pdf'
  | 'audio'
  | 'partner'
  | 'other';

export interface MediaItem {
  id: string;
  name: string;
  title: string;
  description: string;
  url: string;
  path?: string;
  uploadedAt: number;
  type: MediaType;
  category: MediaCategory;
}

@Injectable({
  providedIn: 'root'
})
export class MediaUploadService {
  // Mock implementation for development (Firebase will be added when credentials are provided)

  uploadImage(file: File, folder: string = 'project-images'): Observable<string> {
    // Mock: return data URL for development
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = (e) => {
        observer.next(e.target?.result as string);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsDataURL(file);
    });
  }

  uploadImagePromise(file: File, folder: string = 'project-images'): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  getMediaList(folder: string = 'project-images'): Observable<MediaItem[]> {
    // Return empty array for now
    return from(Promise.resolve([] as MediaItem[]));
  }

  deleteMedia(path: string): Observable<void> {
    // Mock delete
    return from(Promise.resolve());
  }
}
