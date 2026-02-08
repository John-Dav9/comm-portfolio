import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaLibraryService } from '../../services/media-library';
import { SiteContentService } from '../../services/site-content';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly mediaLibrary = inject(MediaLibraryService);
  private readonly siteContent = inject(SiteContentService);

  readonly partnerMedia = computed(() => this.mediaLibrary.getByCategory('partner'));
  readonly publicationsPdf = computed(() => this.mediaLibrary.getByCategory('publication-pdf'));
  readonly showreelVideos = computed(() => this.mediaLibrary.getByCategory('showreel'));

  readonly content = computed(() => this.siteContent.current().about);
}
