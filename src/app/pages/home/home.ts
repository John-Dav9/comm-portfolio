import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaLibraryService } from '../../services/media-library';
import { SiteContentService } from '../../services/site-content';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly mediaLibrary = inject(MediaLibraryService);
  private readonly siteContent = inject(SiteContentService);

  readonly content = computed(() => this.siteContent.current().home);

  readonly pressPhotos = computed(() => this.mediaLibrary.getByCategory('press-photo'));
  readonly showreelVideos = computed(() => this.mediaLibrary.getByCategory('showreel'));
  readonly pressDocuments = computed(() => this.mediaLibrary.getByCategory('publication-pdf'));
  readonly audioClips = computed(() => this.mediaLibrary.getByCategory('audio'));
}
