import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type ArticleStatus = 'draft' | 'published';

interface Article {
  id: number;
  title: string;
  category: string;
  readTime: string;
  status: ArticleStatus;
  summary: string;
}

@Component({
  selector: 'app-articles-admin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './articles-admin.html',
  styleUrl: './articles-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesAdmin {
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

  readonly articles = signal<Article[]>([
    {
      id: 1,
      title: 'Construire un portfolio journaliste',
      category: 'Journalisme',
      readTime: '6 min',
      status: 'published',
      summary: 'Structurer les preuves et gagner en crédibilité.'
    },
    {
      id: 2,
      title: 'Showreel TV : les 3 minutes clés',
      category: 'TV',
      readTime: '5 min',
      status: 'draft',
      summary: 'Éditer un montage qui valorise la présence caméra.'
    },
    {
      id: 3,
      title: 'Portfolio audio pour animateur radio',
      category: 'Radio',
      readTime: '4 min',
      status: 'published',
      summary: 'Sélection des extraits et identité sonore.'
    }
  ]);

  readonly publishedCount = computed(
    () => this.articles().filter((article) => article.status === 'published').length
  );

  readonly articleForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    category: ['Journalisme', Validators.required],
    readTime: ['', [Validators.required, Validators.pattern(/^[0-9]+\s?min$/)]],
    status: ['draft', Validators.required],
    summary: ['', [Validators.required, Validators.minLength(10)]]
  });

  addArticle() {
    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      return;
    }

    const formValue = this.articleForm.getRawValue();
    const status = formValue.status as ArticleStatus;
    
    if (this.editingId() !== null) {
      // Update existing article
      this.articles.update((items) =>
        items.map((article) =>
          article.id === this.editingId()
            ? {
                ...article,
                title: formValue.title,
                category: formValue.category,
                readTime: formValue.readTime,
                status: status,
                summary: formValue.summary
              }
            : article
        )
      );
      this.editingId.set(null);
    } else {
      // Add new article
      const article = {
        id: this.nextId(),
        title: formValue.title,
        category: formValue.category,
        readTime: formValue.readTime,
        status: status,
        summary: formValue.summary
      };

      this.articles.update((items) => [...items, article]);
      this.nextId.update((value) => value + 1);
    }

    this.articleForm.reset({
      title: '',
      category: 'Journalisme',
      readTime: '5 min',
      status: 'draft',
      summary: ''
    });
  }

  editArticle(article: Article) {
    this.editingId.set(article.id);
    this.articleForm.patchValue({
      title: article.title,
      category: article.category,
      readTime: article.readTime,
      status: article.status,
      summary: article.summary
    });
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.editingId.set(null);
    this.articleForm.reset({
      title: '',
      category: 'Journalisme',
      readTime: '5 min',
      status: 'draft',
      summary: ''
    });
  }

  togglePublish(articleId: number) {
    this.articles.update((items) =>
      items.map((article) =>
        article.id === articleId
          ? {
              ...article,
              status: article.status === 'published' ? 'draft' : 'published'
            }
          : article
      )
    );
  }

  removeArticle(articleId: number) {
    this.articles.update((items) => items.filter((article) => article.id !== articleId));
  }

  getArticleToPreview(articleId: number) {
    return this.articles().find((a) => a.id === articleId);
  }
}
