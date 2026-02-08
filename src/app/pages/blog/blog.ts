import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaLibraryService } from '../../services/media-library';
import { SiteContentService } from '../../services/site-content';
import { ArticlesService } from '../../services/articles';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private readonly mediaLibrary = inject(MediaLibraryService);
  private readonly siteContent = inject(SiteContentService);
  private readonly articlesService = inject(ArticlesService);

  readonly pdfResources = computed(() => this.mediaLibrary.getByCategory('publication-pdf'));
  readonly audioResources = computed(() => this.mediaLibrary.getByCategory('audio'));

  readonly content = computed(() => this.siteContent.current().blog);

  readonly articles = computed(() => this.articlesService.getForLang());
}
