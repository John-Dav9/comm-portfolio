import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaLibraryService } from '../../services/media-library';
import { SiteContentService } from '../../services/site-content';
import { ProjectsService } from '../../services/projects';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  private readonly mediaLibrary = inject(MediaLibraryService);
  private readonly siteContent = inject(SiteContentService);
  private readonly projectsService = inject(ProjectsService);

  readonly projectPhotos = computed(() => [
    ...this.mediaLibrary.getByCategory('press-photo'),
    ...this.mediaLibrary.getByCategory('event-photo')
  ]);
  readonly projectVideos = computed(() => this.mediaLibrary.getByCategory('showreel'));
  readonly projectDocuments = computed(() => this.mediaLibrary.getByCategory('publication-pdf'));

  readonly content = computed(() => this.siteContent.current().projects);

  readonly caseStudies = computed(() => this.projectsService.getForLang());
}
