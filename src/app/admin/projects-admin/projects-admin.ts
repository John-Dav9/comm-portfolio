import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService, type ProjectLocale, type ProjectRecord, type ProjectStatus } from '../../services/projects';
import type { Language } from '../../data/site-content';

@Component({
  selector: 'app-projects-admin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './projects-admin.html',
  styleUrl: './projects-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsAdmin {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly document = inject(DOCUMENT);
  private readonly projectsService = inject(ProjectsService);
  readonly activeLang = signal<Language>('fr');
  readonly editingId = signal<string | null>(null);
  readonly projects = computed(() => this.projectsService.items());

  readonly publishedCount = computed(
    () => this.projects().filter((project) => project.status === 'published').length
  );

  readonly projectForm = this.formBuilder.group({
    status: ['draft', Validators.required],
    sortIndex: [1, [Validators.required, Validators.min(1)]],
    fr: this.createLocaleGroup({
      category: '',
      title: '',
      client: '',
      year: '',
      context: '',
      mission: '',
      deliverables: [],
      results: []
    }),
    en: this.createLocaleGroup({
      category: '',
      title: '',
      client: '',
      year: '',
      context: '',
      mission: '',
      deliverables: [],
      results: []
    })
  });

  setLang(lang: Language) {
    this.activeLang.set(lang);
  }

  async addProject() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const record = this.buildRecord();
    const currentId = this.editingId();

    if (currentId !== null) {
      const updated = await this.projectsService.update({ ...record, id: currentId });
      if (!updated) {
        return;
      }
      this.editingId.set(null);
    } else {
      await this.projectsService.add(record);
    }

    this.resetForm();
  }

  editProject(project: ProjectRecord) {
    this.editingId.set(project.id);
    this.projectForm.patchValue({
      status: project.status,
      sortIndex: project.sortIndex,
      fr: this.localeToForm(project.content.fr),
      en: this.localeToForm(project.content.en)
    });
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async togglePublish(project: ProjectRecord) {
    const nextStatus: ProjectStatus = project.status === 'published' ? 'draft' : 'published';
    await this.projectsService.update({ ...project, status: nextStatus });
  }

  async removeProject(project: ProjectRecord) {
    await this.projectsService.remove(project.id);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.resetForm();
  }

  private resetForm() {
    const nextIndex = this.projectsService.items().length + 1;
    this.projectForm.reset({
      status: 'draft',
      sortIndex: nextIndex,
      fr: this.createLocaleFormValue(),
      en: this.createLocaleFormValue()
    });
  }

  private createLocaleGroup(value: ProjectLocale) {
    return this.formBuilder.group({
      category: [value.category, [Validators.required, Validators.minLength(2)]],
      title: [value.title, [Validators.required, Validators.minLength(3)]],
      client: [value.client, [Validators.required, Validators.minLength(2)]],
      year: [value.year, [Validators.required, Validators.minLength(4)]],
      context: [value.context, [Validators.required, Validators.minLength(10)]],
      mission: [value.mission, [Validators.required, Validators.minLength(10)]],
      deliverables: [value.deliverables.join(', ')],
      results: [value.results.join(', ')]
    });
  }

  private createLocaleValue(): ProjectLocale {
    return {
      category: '',
      title: '',
      client: '',
      year: '',
      context: '',
      mission: '',
      deliverables: [],
      results: []
    };
  }

  private createLocaleFormValue() {
    return {
      category: '',
      title: '',
      client: '',
      year: '',
      context: '',
      mission: '',
      deliverables: '',
      results: ''
    };
  }

  private localeToForm(locale: ProjectLocale) {
    return {
      category: locale.category,
      title: locale.title,
      client: locale.client,
      year: locale.year,
      context: locale.context,
      mission: locale.mission,
      deliverables: locale.deliverables.join(', '),
      results: locale.results.join(', ')
    };
  }

  private buildRecord(): Omit<ProjectRecord, 'id'> {
    const raw = this.projectForm.getRawValue();
    const sortIndex = Number(raw.sortIndex) || 1;
    const status = raw.status as ProjectStatus;
    const fr = this.formToLocale(raw.fr);
    const en = this.formToLocale(raw.en);

    return {
      status,
      sortIndex,
      content: { fr, en }
    };
  }

  private formToLocale(value: {
    category: string;
    title: string;
    client: string;
    year: string;
    context: string;
    mission: string;
    deliverables: string;
    results: string;
  }): ProjectLocale {
    return {
      category: value.category.trim(),
      title: value.title.trim(),
      client: value.client.trim(),
      year: value.year.trim(),
      context: value.context.trim(),
      mission: value.mission.trim(),
      deliverables: value.deliverables
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
      results: value.results
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    };
  }
}
