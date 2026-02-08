import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticlesService, type ArticleLocale, type ArticleRecord, type ArticleStatus } from '../../services/articles';
import type { Language } from '../../data/site-content';

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
  private readonly articlesService = inject(ArticlesService);
  readonly activeLang = signal<Language>('fr');
  readonly editingId = signal<string | null>(null);
  readonly articles = computed(() => this.articlesService.items());
  readonly publishedCount = computed(
    () => this.articles().filter((article) => article.status === 'published').length
  );

  readonly articleForm = this.formBuilder.group({
    status: ['draft', Validators.required],
    sortIndex: [1, [Validators.required, Validators.min(1)]],
    fr: this.createLocaleGroup({
      title: '',
      category: '',
      readTime: '',
      author: '',
      date: '',
      summary: '',
      tags: []
    }),
    en: this.createLocaleGroup({
      title: '',
      category: '',
      readTime: '',
      author: '',
      date: '',
      summary: '',
      tags: []
    })
  });

  setLang(lang: Language) {
    this.activeLang.set(lang);
  }

  async addArticle() {
    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      return;
    }

    const record = this.buildRecord();
    const currentId = this.editingId();

    if (currentId !== null) {
      const updated = await this.articlesService.update({ ...record, id: currentId });
      if (!updated) {
        return;
      }
      this.editingId.set(null);
    } else {
      await this.articlesService.add(record);
    }

    this.resetForm();
  }

  editArticle(article: ArticleRecord) {
    this.editingId.set(article.id);
    this.articleForm.patchValue({
      status: article.status,
      sortIndex: article.sortIndex,
      fr: this.localeToForm(article.content.fr),
      en: this.localeToForm(article.content.en)
    });
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async togglePublish(article: ArticleRecord) {
    const nextStatus: ArticleStatus = article.status === 'published' ? 'draft' : 'published';
    await this.articlesService.update({ ...article, status: nextStatus });
  }

  async removeArticle(article: ArticleRecord) {
    await this.articlesService.remove(article.id);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.resetForm();
  }

  private resetForm() {
    const nextIndex = this.articles().length + 1;
    this.articleForm.reset({
      status: 'draft',
      sortIndex: nextIndex,
      fr: this.createLocaleFormValue(),
      en: this.createLocaleFormValue()
    });
  }

  private createLocaleGroup(value: ArticleLocale) {
    return this.formBuilder.group({
      title: [value.title, [Validators.required, Validators.minLength(3)]],
      category: [value.category, [Validators.required, Validators.minLength(2)]],
      readTime: [value.readTime, [Validators.required, Validators.minLength(2)]],
      author: [value.author, [Validators.required, Validators.minLength(2)]],
      date: [value.date, [Validators.required, Validators.minLength(2)]],
      summary: [value.summary, [Validators.required, Validators.minLength(10)]],
      tags: [value.tags.join(', ')]
    });
  }

  private createLocaleValue(): ArticleLocale {
    return {
      title: '',
      category: '',
      readTime: '',
      author: '',
      date: '',
      summary: '',
      tags: []
    };
  }

  private createLocaleFormValue() {
    return {
      title: '',
      category: '',
      readTime: '',
      author: '',
      date: '',
      summary: '',
      tags: ''
    };
  }

  private localeToForm(locale: ArticleLocale) {
    return {
      title: locale.title,
      category: locale.category,
      readTime: locale.readTime,
      author: locale.author,
      date: locale.date,
      summary: locale.summary,
      tags: locale.tags.join(', ')
    };
  }

  private buildRecord(): Omit<ArticleRecord, 'id'> {
    const raw = this.articleForm.getRawValue();
    const sortIndex = Number(raw.sortIndex) || 1;
    const status = raw.status as ArticleStatus;
    const fr = this.formToLocale(raw.fr);
    const en = this.formToLocale(raw.en);

    return {
      status,
      sortIndex,
      content: { fr, en }
    };
  }

  private formToLocale(value: {
    title: string;
    category: string;
    readTime: string;
    author: string;
    date: string;
    summary: string;
    tags: string;
  }): ArticleLocale {
    return {
      title: value.title.trim(),
      category: value.category.trim(),
      readTime: value.readTime.trim(),
      author: value.author.trim(),
      date: value.date.trim(),
      summary: value.summary.trim(),
      tags: value.tags
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    };
  }
}
