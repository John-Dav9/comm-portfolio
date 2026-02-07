import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type ProjectStatus = 'draft' | 'published';

interface Project {
  id: number;
  title: string;
  client: string;
  year: string;
  status: ProjectStatus;
  summary: string;
}

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
  private readonly nextId = signal(6);
  readonly editingId = signal<number | null>(null);
  readonly showPreview = signal<number | null>(null);

  readonly statusOptions = [
    { value: 'draft', label: 'Brouillon' },
    { value: 'published', label: 'Publié' }
  ];

  readonly categoryOptions = [
    { value: 'Journalisme', label: 'Journalisme' },
    { value: 'Radio', label: 'Radio' },
    { value: 'TV', label: 'TV' },
    { value: 'Événementiel', label: 'Événementiel' },
    { value: 'Digital', label: 'Communication digitale' }
  ];

  readonly projects = signal<Project[]>([
    {
      id: 1,
      title: 'Enquête sociétale long format',
      client: 'Rédaction Regard',
      year: '2025',
      status: 'published',
      summary: 'Dossier complet + diffusion multi-support.'
    },
    {
      id: 2,
      title: 'Concept émission quotidienne',
      client: 'Radio Horizon 105.7',
      year: '2024',
      status: 'published',
      summary: 'Identité sonore et plan éditorial hebdo.'
    },
    {
      id: 3,
      title: 'Showreel présentateur',
      client: 'Studio Visio',
      year: '2025',
      status: 'draft',
      summary: 'Montage 90 secondes avec extraits studio.'
    }
  ]);

  readonly publishedCount = computed(
    () => this.projects().filter((project) => project.status === 'published').length
  );

  readonly projectForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    client: ['', [Validators.required, Validators.minLength(2)]],
    year: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
    status: ['draft', Validators.required],
    summary: ['', [Validators.required, Validators.minLength(10)]]
  });

  addProject() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const formValue = this.projectForm.getRawValue();
    const status = formValue.status as ProjectStatus;
    
    if (this.editingId() !== null) {
      // Update existing project
      this.projects.update((items) =>
        items.map((project) =>
          project.id === this.editingId()
            ? {
                ...project,
                title: formValue.title,
                client: formValue.client,
                year: formValue.year,
                status: status,
                summary: formValue.summary
              }
            : project
        )
      );
      this.editingId.set(null);
    } else {
      // Add new project
      const project = {
        id: this.nextId(),
        title: formValue.title,
        client: formValue.client,
        year: formValue.year,
        status: status,
        summary: formValue.summary
      };

      this.projects.update((items) => [...items, project]);
      this.nextId.update((value) => value + 1);
    }

    this.projectForm.reset({
      title: '',
      client: '',
      year: '',
      status: 'draft',
      summary: ''
    });
  }

  editProject(project: Project) {
    this.editingId.set(project.id);
    this.projectForm.patchValue({
      title: project.title,
      client: project.client,
      year: project.year,
      status: project.status,
      summary: project.summary
    });
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.editingId.set(null);
    this.projectForm.reset({
      title: '',
      client: '',
      year: '',
      status: 'draft',
      summary: ''
    });
  }

  togglePublish(projectId: number) {
    this.projects.update((items) =>
      items.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status: project.status === 'published' ? 'draft' : 'published'
            }
          : project
      )
    );
  }

  removeProject(projectId: number) {
    this.projects.update((items) => items.filter((project) => project.id !== projectId));
  }

  getProjectToPreview(projectId: number) {
    return this.projects().find((p) => p.id === projectId);
  }
}
