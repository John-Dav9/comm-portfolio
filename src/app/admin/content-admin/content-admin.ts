import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SiteContentService } from '../../services/site-content';
import { SupabaseService } from '../../services/supabase';
import type { Language, SiteContent } from '../../data/site-content';

type StringControl = FormControl<string>;
type StringArray = FormArray<StringControl>;

@Component({
  selector: 'app-content-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './content-admin.html',
  styleUrl: './content-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentAdmin {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly siteContent = inject(SiteContentService);
  private readonly supabase = inject(SupabaseService).client;
  private readonly destroyRef = inject(DestroyRef);

  readonly activeLang = signal<Language>('fr');
  readonly saveMessage = signal<string | null>(null);
  readonly uploadMessage = signal<string | null>(null);
  readonly themeOptions = [
    { value: 'sable', label: 'Sable (dégradé doux)' },
    { value: 'noir-pro', label: 'Noir Pro (uni)' },
    { value: 'presse', label: 'Presse (uni clair)' },
    { value: 'emeraude', label: 'Émeraude (uni)' },
    { value: 'sunset', label: 'Sunset (dégradé chaud)' }
  ];

  private readonly homePanelListArray = this.formBuilder.array<StringControl>([]);
  private readonly homePanelMicroArray = this.formBuilder.array<FormGroup<{
    value: StringControl;
    label: StringControl;
  }>>([]);
  private readonly homeProofCardsArray = this.formBuilder.array<FormGroup<{
    pill: StringControl;
    title: StringControl;
    text: StringControl;
  }>>([]);
  private readonly homeServiceCardsArray = this.formBuilder.array<FormGroup<{
    title: StringControl;
    text: StringControl;
    items: StringArray;
  }>>([]);
  private readonly homeProcessStepsArray = this.formBuilder.array<FormGroup<{
    number: StringControl;
    title: StringControl;
    text: StringControl;
  }>>([]);
  private readonly homeShowcaseCardsArray = this.formBuilder.array<FormGroup<{
    pill: StringControl;
    title: StringControl;
    text: StringControl;
    meta: StringControl;
  }>>([]);
  private readonly homeTestimonialsArray = this.formBuilder.array<FormGroup<{
    text: StringControl;
    author: StringControl;
  }>>([]);

  private readonly aboutMetricsArray = this.formBuilder.array<FormGroup<{
    value: StringControl;
    label: StringControl;
  }>>([]);
  private readonly aboutCardListArray = this.formBuilder.array<StringControl>([]);
  private readonly aboutValuesArray = this.formBuilder.array<FormGroup<{
    title: StringControl;
    description: StringControl;
  }>>([]);
  private readonly aboutTimelineArray = this.formBuilder.array<FormGroup<{
    title: StringControl;
    detail: StringControl;
  }>>([]);
  private readonly aboutHighlightsArray = this.formBuilder.array<FormGroup<{
    title: StringControl;
    detail: StringControl;
  }>>([]);
  private readonly aboutPartnersArray = this.formBuilder.array<StringControl>([]);
  private readonly aboutPartnerLogosArray = this.formBuilder.array<FormGroup<{
    name: StringControl;
    url: StringControl;
  }>>([]);
  private readonly aboutPressKitArray = this.formBuilder.array<FormGroup<{
    title: StringControl;
    description: StringControl;
  }>>([]);

  private readonly projectsBulletsArray = this.formBuilder.array<StringControl>([]);
  private readonly blogHeroListArray = this.formBuilder.array<StringControl>([]);

  private readonly contactCardsArray = this.formBuilder.array<FormGroup<{
    title: StringControl;
    line1: StringControl;
    line2: StringControl;
  }>>([]);
  private readonly contactProfileOptionsArray = this.formBuilder.array<FormGroup<{
    value: StringControl;
    label: StringControl;
  }>>([]);
  private readonly contactProjectOptionsArray = this.formBuilder.array<FormGroup<{
    value: StringControl;
    label: StringControl;
  }>>([]);

  readonly contentForm = this.formBuilder.group({
    theme: ['sable'],
    header: this.formBuilder.group({
      brandTitle: ['', [Validators.required, Validators.minLength(2)]],
      subtitle: ['', [Validators.required, Validators.minLength(3)]],
      brandLogoUrl: [''],
      brandLogoAlt: [''],
      nav: this.formBuilder.group({
        home: ['', Validators.required],
        about: ['', Validators.required],
        projects: ['', Validators.required],
        blog: ['', Validators.required],
        contact: ['', Validators.required],
        admin: ['', Validators.required]
      })
    }),
    footer: this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contactLabel: ['', Validators.required],
      rights: ['', Validators.required],
      copyright: ['', Validators.required]
    }),
    home: this.formBuilder.group({
      hero: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        imageUrl: [''],
        imageAlt: [''],
        primary: ['', Validators.required],
        secondary: ['', Validators.required],
        tags: ['']
      }),
      panel: this.formBuilder.group({
        pill: ['', Validators.required],
        title: ['', Validators.required],
        list: this.homePanelListArray,
        micro: this.homePanelMicroArray
      }),
      proof: this.formBuilder.group({
        cards: this.homeProofCardsArray
      }),
      services: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        cards: this.homeServiceCardsArray
      }),
      process: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        steps: this.homeProcessStepsArray
      }),
      showcase: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        cards: this.homeShowcaseCardsArray
      }),
      testimonials: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        items: this.homeTestimonialsArray
      }),
      cta: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        button: ['', Validators.required]
      }),
      media: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        photos: ['', Validators.required],
        videos: ['', Validators.required],
        docs: ['', Validators.required],
        audio: ['', Validators.required],
        emptyPhotos: ['', Validators.required],
        emptyVideos: ['', Validators.required],
        emptyDocs: ['', Validators.required],
        emptyAudio: ['', Validators.required]
      })
    }),
    about: this.formBuilder.group({
      hero: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        imageUrl: [''],
        imageAlt: [''],
        metrics: this.aboutMetricsArray,
        cardTitle: ['', Validators.required],
        cardList: this.aboutCardListArray
      }),
      values: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        items: this.aboutValuesArray
      }),
      timeline: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        items: this.aboutTimelineArray
      }),
      highlights: this.formBuilder.group({
        title: ['', Validators.required],
        items: this.aboutHighlightsArray
      }),
      partners: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        items: this.aboutPartnersArray,
        logos: this.aboutPartnerLogosArray
      }),
      partnerMedia: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        empty: ['', Validators.required]
      }),
      publications: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        empty: ['', Validators.required]
      }),
      showreel: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        empty: ['', Validators.required]
      }),
      pressKit: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        items: this.aboutPressKitArray
      }),
      cta: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        button: ['', Validators.required]
      })
    }),
    projects: this.formBuilder.group({
      hero: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        imageUrl: [''],
        imageAlt: [''],
        panelTitle: ['', Validators.required],
        bullets: this.projectsBulletsArray
      }),
      media: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        emptyPhoto: ['', Validators.required],
        emptyVideo: ['', Validators.required],
        emptyDoc: ['', Validators.required]
      }),
      cta: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        button: ['', Validators.required]
      })
    }),
    blog: this.formBuilder.group({
      hero: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        imageUrl: [''],
        imageAlt: [''],
        listTitle: ['', Validators.required],
        list: this.blogHeroListArray
      }),
      resources: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        pdfTitle: ['', Validators.required],
        audioTitle: ['', Validators.required],
        emptyPdf: ['', Validators.required],
        emptyAudio: ['', Validators.required],
        hint: ['', Validators.required]
      }),
      cta: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required],
        button: ['', Validators.required]
      })
    }),
    contact: this.formBuilder.group({
      hero: this.formBuilder.group({
        eyebrow: ['', Validators.required],
        title: ['', Validators.required],
        lead: ['', Validators.required]
      }),
      cards: this.contactCardsArray,
      form: this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        profile: ['', Validators.required],
        projectType: ['', Validators.required],
        message: ['', Validators.required],
        consent: ['', Validators.required],
        submit: ['', Validators.required],
        success: ['', Validators.required]
      }),
      errors: this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', Validators.required],
        message: ['', Validators.required],
        consent: ['', Validators.required]
      }),
      profileOptions: this.contactProfileOptionsArray,
      projectOptions: this.contactProjectOptionsArray
    })
  });
  constructor() {
    this.loadFromService();
    this.contentForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const next = this.buildContentFromForm();
        const localized = this.siteContent.getRawContent();
        const lang = this.activeLang();
        const updated = { ...localized, [lang]: next };
        this.siteContent.setPreview(updated);
      });
  }

  setLang(lang: Language) {
    if (this.activeLang() === lang) {
      return;
    }
    this.activeLang.set(lang);
    this.loadFromService();
  }

  async saveForm() {
    this.saveMessage.set(null);

    const content = this.buildContentFromForm();
    const saved = await this.siteContent.updateLanguage(this.activeLang(), content);
    if (saved) {
      this.saveMessage.set('Contenu mis a jour.');
    } else {
      this.saveMessage.set(this.siteContent.error() ?? 'Sauvegarde impossible.');
    }
  }

  openPreview() {
    const lang = this.activeLang();
    window.open(`/?preview=1&lang=${lang}`, '_blank');
  }

  async uploadImage(event: Event, controlPath: string) {
    const input = event.target as HTMLInputElement | null;
    if (!input?.files?.length) {
      return;
    }
    const file = input.files[0];
    const path = `site/${Date.now()}-${file.name}`;
    const { error } = await this.supabase.storage.from('media').upload(path, file, {
      upsert: true,
      contentType: file.type
    });
    if (error) {
      this.uploadMessage.set('Upload impossible.');
      return;
    }

    const { data } = this.supabase.storage.from('media').getPublicUrl(path);
    const control = this.contentForm.get(controlPath) as FormControl<string> | null;
    if (control) {
      control.setValue(data.publicUrl);
      this.uploadMessage.set('Image importee.');
    }
  }

  homePanelList() {
    return this.homePanelListArray;
  }

  homePanelMicro() {
    return this.homePanelMicroArray;
  }

  homeProofCards() {
    return this.homeProofCardsArray;
  }

  homeServiceCards() {
    return this.homeServiceCardsArray;
  }

  homeServiceCardItems(index: number) {
    return this.homeServiceCardsArray.at(index).controls.items;
  }

  homeProcessSteps() {
    return this.homeProcessStepsArray;
  }

  homeShowcaseCards() {
    return this.homeShowcaseCardsArray;
  }

  homeTestimonials() {
    return this.homeTestimonialsArray;
  }

  aboutMetrics() {
    return this.aboutMetricsArray;
  }

  aboutCardList() {
    return this.aboutCardListArray;
  }

  aboutValues() {
    return this.aboutValuesArray;
  }

  aboutTimeline() {
    return this.aboutTimelineArray;
  }

  aboutHighlights() {
    return this.aboutHighlightsArray;
  }

  aboutPartners() {
    return this.aboutPartnersArray;
  }

  aboutPartnerLogos() {
    return this.aboutPartnerLogosArray;
  }

  aboutPressKit() {
    return this.aboutPressKitArray;
  }

  projectsBullets() {
    return this.projectsBulletsArray;
  }

  blogHeroList() {
    return this.blogHeroListArray;
  }

  contactCards() {
    return this.contactCardsArray;
  }

  contactProfileOptions() {
    return this.contactProfileOptionsArray;
  }

  contactProjectOptions() {
    return this.contactProjectOptionsArray;
  }

  addStringItem(array: StringArray) {
    array.push(this.formBuilder.control(''));
  }

  removeStringItem(array: StringArray, index: number) {
    if (array.length <= 1) {
      return;
    }
    array.removeAt(index);
  }

  addHomePanelMicro() {
    this.homePanelMicroArray.push(this.createValueLabel('', ''));
  }

  addHomeProofCard() {
    this.homeProofCardsArray.push(this.createHomeProofCard());
  }

  addHomeServiceCard() {
    this.homeServiceCardsArray.push(this.createHomeServiceCard());
  }

  addHomeServiceItem(index: number) {
    this.homeServiceCardItems(index).push(this.formBuilder.control(''));
  }

  removeHomeServiceItem(cardIndex: number, itemIndex: number) {
    const items = this.homeServiceCardItems(cardIndex);
    if (items.length <= 1) {
      return;
    }
    items.removeAt(itemIndex);
  }

  addHomeProcessStep() {
    this.homeProcessStepsArray.push(this.createHomeProcessStep());
  }

  addHomeShowcaseCard() {
    this.homeShowcaseCardsArray.push(this.createHomeShowcaseCard());
  }

  addHomeTestimonial() {
    this.homeTestimonialsArray.push(this.createHomeTestimonial());
  }

  addAboutMetric() {
    this.aboutMetricsArray.push(this.createValueLabel('', ''));
  }

  addAboutValue() {
    this.aboutValuesArray.push(this.createAboutValue());
  }

  addAboutTimeline() {
    this.aboutTimelineArray.push(this.createAboutTimeline());
  }

  addAboutHighlight() {
    this.aboutHighlightsArray.push(this.createAboutHighlight());
  }

  addAboutPartner() {
    this.aboutPartnersArray.push(this.formBuilder.control(''));
  }

  addAboutPartnerLogo() {
    this.aboutPartnerLogosArray.push(this.createPartnerLogo());
  }

  addAboutPressKit() {
    this.aboutPressKitArray.push(this.createPressKit());
  }

  addProjectsBullet() {
    this.projectsBulletsArray.push(this.formBuilder.control(''));
  }

  addBlogHeroItem() {
    this.blogHeroListArray.push(this.formBuilder.control(''));
  }

  addContactCard() {
    this.contactCardsArray.push(this.createContactCard());
  }

  addContactProfileOption() {
    this.contactProfileOptionsArray.push(this.createOption());
  }

  addContactProjectOption() {
    this.contactProjectOptionsArray.push(this.createOption());
  }

  removeArrayItem(array: FormArray<any>, index: number) {
    if (array.length <= 1) {
      return;
    }
    array.removeAt(index);
  }

  private loadFromService() {
    const lang = this.activeLang();
    const content = this.siteContent.getRawContent()[lang];
    this.patchForm(content);
  }
  private patchForm(content: SiteContent) {
    this.contentForm.patchValue({
      theme: content.theme,
      header: {
        brandTitle: content.header.brandTitle,
        subtitle: content.header.subtitle,
        brandLogoUrl: content.header.brandLogoUrl,
        brandLogoAlt: content.header.brandLogoAlt,
        nav: { ...content.header.nav }
      },
      footer: {
        email: content.footer.email,
        contactLabel: content.footer.contactLabel,
        rights: content.footer.rights,
        copyright: content.footer.copyright
      },
      home: {
        hero: {
          eyebrow: content.home.hero.eyebrow,
          title: content.home.hero.title,
          lead: content.home.hero.lead,
          imageUrl: content.home.hero.imageUrl,
          imageAlt: content.home.hero.imageAlt,
          primary: content.home.hero.actions.primary,
          secondary: content.home.hero.actions.secondary,
          tags: content.home.hero.tags.join(', ')
        },
        panel: {
          pill: content.home.panel.pill,
          title: content.home.panel.title
        },
        services: {
          eyebrow: content.home.services.eyebrow,
          title: content.home.services.title,
          lead: content.home.services.lead
        },
        process: {
          eyebrow: content.home.process.eyebrow,
          title: content.home.process.title
        },
        showcase: {
          eyebrow: content.home.showcase.eyebrow,
          title: content.home.showcase.title
        },
        testimonials: {
          eyebrow: content.home.testimonials.eyebrow,
          title: content.home.testimonials.title
        },
        cta: {
          eyebrow: content.home.cta.eyebrow,
          title: content.home.cta.title,
          lead: content.home.cta.lead,
          button: content.home.cta.button
        },
        media: {
          eyebrow: content.home.media.eyebrow,
          title: content.home.media.title,
          lead: content.home.media.lead,
          photos: content.home.media.photos,
          videos: content.home.media.videos,
          docs: content.home.media.docs,
          audio: content.home.media.audio,
          emptyPhotos: content.home.media.emptyPhotos,
          emptyVideos: content.home.media.emptyVideos,
          emptyDocs: content.home.media.emptyDocs,
          emptyAudio: content.home.media.emptyAudio
        }
      },
      about: {
        hero: {
          eyebrow: content.about.hero.eyebrow,
          title: content.about.hero.title,
          lead: content.about.hero.lead,
          imageUrl: content.about.hero.imageUrl,
          imageAlt: content.about.hero.imageAlt,
          cardTitle: content.about.hero.cardTitle
        },
        values: {
          eyebrow: content.about.values.eyebrow,
          title: content.about.values.title
        },
        timeline: {
          eyebrow: content.about.timeline.eyebrow,
          title: content.about.timeline.title
        },
        highlights: {
          title: content.about.highlights.title
        },
        partners: {
          eyebrow: content.about.partners.eyebrow,
          title: content.about.partners.title
        },
        partnerMedia: {
          eyebrow: content.about.partnerMedia.eyebrow,
          title: content.about.partnerMedia.title,
          empty: content.about.partnerMedia.empty
        },
        publications: {
          eyebrow: content.about.publications.eyebrow,
          title: content.about.publications.title,
          empty: content.about.publications.empty
        },
        showreel: {
          eyebrow: content.about.showreel.eyebrow,
          title: content.about.showreel.title,
          empty: content.about.showreel.empty
        },
        pressKit: {
          eyebrow: content.about.pressKit.eyebrow,
          title: content.about.pressKit.title
        },
        cta: {
          eyebrow: content.about.cta.eyebrow,
          title: content.about.cta.title,
          lead: content.about.cta.lead,
          button: content.about.cta.button
        }
      },
      projects: {
        hero: {
          eyebrow: content.projects.hero.eyebrow,
          title: content.projects.hero.title,
          lead: content.projects.hero.lead,
          imageUrl: content.projects.hero.imageUrl,
          imageAlt: content.projects.hero.imageAlt,
          panelTitle: content.projects.hero.panelTitle
        },
        media: {
          eyebrow: content.projects.media.eyebrow,
          title: content.projects.media.title,
          emptyPhoto: content.projects.media.emptyPhoto,
          emptyVideo: content.projects.media.emptyVideo,
          emptyDoc: content.projects.media.emptyDoc
        },
        cta: {
          eyebrow: content.projects.cta.eyebrow,
          title: content.projects.cta.title,
          lead: content.projects.cta.lead,
          button: content.projects.cta.button
        }
      },
      blog: {
        hero: {
          eyebrow: content.blog.hero.eyebrow,
          title: content.blog.hero.title,
          lead: content.blog.hero.lead,
          imageUrl: content.blog.hero.imageUrl,
          imageAlt: content.blog.hero.imageAlt,
          listTitle: content.blog.hero.listTitle
        },
        resources: {
          eyebrow: content.blog.resources.eyebrow,
          title: content.blog.resources.title,
          pdfTitle: content.blog.resources.pdfTitle,
          audioTitle: content.blog.resources.audioTitle,
          emptyPdf: content.blog.resources.emptyPdf,
          emptyAudio: content.blog.resources.emptyAudio,
          hint: content.blog.resources.hint
        },
        cta: {
          eyebrow: content.blog.cta.eyebrow,
          title: content.blog.cta.title,
          lead: content.blog.cta.lead,
          button: content.blog.cta.button
        }
      },
      contact: {
        hero: {
          eyebrow: content.contact.hero.eyebrow,
          title: content.contact.hero.title,
          lead: content.contact.hero.lead
        },
        form: { ...content.contact.form },
        errors: { ...content.contact.errors }
      }
    });

    this.setStringArray(this.homePanelListArray, content.home.panel.list);
    this.setValueLabelArray(this.homePanelMicroArray, content.home.panel.micro);
    this.setHomeProofCards(content.home.proof.cards);
    this.setHomeServiceCards(content.home.services.cards);
    this.setHomeProcessSteps(content.home.process.steps);
    this.setHomeShowcaseCards(content.home.showcase.cards);
    this.setHomeTestimonials(content.home.testimonials.items);

    this.setValueLabelArray(this.aboutMetricsArray, content.about.hero.metrics);
    this.setStringArray(this.aboutCardListArray, content.about.hero.cardList);
    this.setAboutValues(content.about.values.items);
    this.setAboutTimeline(content.about.timeline.items);
    this.setAboutHighlights(content.about.highlights.items);
    this.setStringArray(this.aboutPartnersArray, content.about.partners.items);
    this.setPartnerLogos(content.about.partners.logos);
    this.setPressKit(content.about.pressKit.items);

    this.setStringArray(this.projectsBulletsArray, content.projects.hero.bullets);
    this.setStringArray(this.blogHeroListArray, content.blog.hero.list);

    this.setContactCards(content.contact.cards);
    this.setOptions(this.contactProfileOptionsArray, content.contact.profileOptions);
    this.setOptions(this.contactProjectOptionsArray, content.contact.projectOptions);
  }

  private buildContentFromForm(): SiteContent {
    const raw = this.contentForm.getRawValue();
    return {
      theme: raw.theme || 'sable',
      header: {
        brandTitle: raw.header.brandTitle,
        subtitle: raw.header.subtitle,
        brandLogoUrl: raw.header.brandLogoUrl,
        brandLogoAlt: raw.header.brandLogoAlt,
        nav: { ...raw.header.nav }
      },
      footer: { ...raw.footer },
      home: {
        hero: {
          eyebrow: raw.home.hero.eyebrow,
          title: raw.home.hero.title,
          lead: raw.home.hero.lead,
          imageUrl: raw.home.hero.imageUrl,
          imageAlt: raw.home.hero.imageAlt,
          actions: {
            primary: raw.home.hero.primary,
            secondary: raw.home.hero.secondary
          },
          tags: this.splitCsv(raw.home.hero.tags)
        },
        panel: {
          pill: raw.home.panel.pill,
          title: raw.home.panel.title,
          list: this.homePanelListArray.getRawValue(),
          micro: this.homePanelMicroArray.getRawValue()
        },
        proof: {
          cards: this.homeProofCardsArray.getRawValue()
        },
        services: {
          eyebrow: raw.home.services.eyebrow,
          title: raw.home.services.title,
          lead: raw.home.services.lead,
          cards: this.homeServiceCardsArray.getRawValue().map((card) => ({
            title: card.title,
            text: card.text,
            items: card.items
          }))
        },
        process: {
          eyebrow: raw.home.process.eyebrow,
          title: raw.home.process.title,
          steps: this.homeProcessStepsArray.getRawValue()
        },
        showcase: {
          eyebrow: raw.home.showcase.eyebrow,
          title: raw.home.showcase.title,
          cards: this.homeShowcaseCardsArray.getRawValue()
        },
        testimonials: {
          eyebrow: raw.home.testimonials.eyebrow,
          title: raw.home.testimonials.title,
          items: this.homeTestimonialsArray.getRawValue()
        },
        cta: { ...raw.home.cta },
        media: { ...raw.home.media }
      },
      about: {
        hero: {
          eyebrow: raw.about.hero.eyebrow,
          title: raw.about.hero.title,
          lead: raw.about.hero.lead,
          imageUrl: raw.about.hero.imageUrl,
          imageAlt: raw.about.hero.imageAlt,
          metrics: this.aboutMetricsArray.getRawValue(),
          cardTitle: raw.about.hero.cardTitle,
          cardList: this.aboutCardListArray.getRawValue()
        },
        values: {
          eyebrow: raw.about.values.eyebrow,
          title: raw.about.values.title,
          items: this.aboutValuesArray.getRawValue()
        },
        timeline: {
          eyebrow: raw.about.timeline.eyebrow,
          title: raw.about.timeline.title,
          items: this.aboutTimelineArray.getRawValue()
        },
        highlights: {
          title: raw.about.highlights.title,
          items: this.aboutHighlightsArray.getRawValue()
        },
        partners: {
          eyebrow: raw.about.partners.eyebrow,
          title: raw.about.partners.title,
          items: this.aboutPartnersArray.getRawValue(),
          logos: this.aboutPartnerLogosArray.getRawValue()
        },
        partnerMedia: { ...raw.about.partnerMedia },
        publications: { ...raw.about.publications },
        showreel: { ...raw.about.showreel },
        pressKit: {
          eyebrow: raw.about.pressKit.eyebrow,
          title: raw.about.pressKit.title,
          items: this.aboutPressKitArray.getRawValue()
        },
        cta: { ...raw.about.cta }
      },
      projects: {
        hero: {
          eyebrow: raw.projects.hero.eyebrow,
          title: raw.projects.hero.title,
          lead: raw.projects.hero.lead,
          imageUrl: raw.projects.hero.imageUrl,
          imageAlt: raw.projects.hero.imageAlt,
          panelTitle: raw.projects.hero.panelTitle,
          bullets: this.projectsBulletsArray.getRawValue()
        },
        media: { ...raw.projects.media },
        cta: { ...raw.projects.cta }
      },
      blog: {
        hero: {
          eyebrow: raw.blog.hero.eyebrow,
          title: raw.blog.hero.title,
          lead: raw.blog.hero.lead,
          imageUrl: raw.blog.hero.imageUrl,
          imageAlt: raw.blog.hero.imageAlt,
          listTitle: raw.blog.hero.listTitle,
          list: this.blogHeroListArray.getRawValue()
        },
        resources: { ...raw.blog.resources },
        cta: { ...raw.blog.cta }
      },
      contact: {
        hero: { ...raw.contact.hero },
        cards: this.contactCardsArray.getRawValue().map((card) => ({
          title: card.title,
          lines: [card.line1, card.line2].filter((line) => line.trim().length > 0)
        })),
        form: { ...raw.contact.form },
        errors: { ...raw.contact.errors },
        profileOptions: this.contactProfileOptionsArray.getRawValue(),
        projectOptions: this.contactProjectOptionsArray.getRawValue()
      }
    };
  }

  private splitCsv(value: string) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  private setStringArray(array: StringArray, values: string[]) {
    array.clear();
    values.forEach((value) => array.push(this.formBuilder.control(value)));
    if (array.length === 0) {
      array.push(this.formBuilder.control(''));
    }
  }

  private setValueLabelArray(array: FormArray<FormGroup<{ value: StringControl; label: StringControl }>>, values: Array<{ value: string; label: string }>) {
    array.clear();
    values.forEach((item) => array.push(this.createValueLabel(item.value, item.label)));
    if (array.length === 0) {
      array.push(this.createValueLabel('', ''));
    }
  }

  private setHomeProofCards(cards: Array<{ pill: string; title: string; text: string }>) {
    this.homeProofCardsArray.clear();
    cards.forEach((card) => this.homeProofCardsArray.push(this.createHomeProofCard(card)));
    if (this.homeProofCardsArray.length === 0) {
      this.homeProofCardsArray.push(this.createHomeProofCard());
    }
  }

  private setHomeServiceCards(cards: Array<{ title: string; text: string; items: string[] }>) {
    this.homeServiceCardsArray.clear();
    cards.forEach((card) => {
      this.homeServiceCardsArray.push(this.createHomeServiceCard(card));
    });
    if (this.homeServiceCardsArray.length === 0) {
      this.homeServiceCardsArray.push(this.createHomeServiceCard());
    }
  }

  private setHomeProcessSteps(steps: Array<{ number: string; title: string; text: string }>) {
    this.homeProcessStepsArray.clear();
    steps.forEach((step) => this.homeProcessStepsArray.push(this.createHomeProcessStep(step)));
    if (this.homeProcessStepsArray.length === 0) {
      this.homeProcessStepsArray.push(this.createHomeProcessStep());
    }
  }

  private setHomeShowcaseCards(cards: Array<{ pill: string; title: string; text: string; meta: string }>) {
    this.homeShowcaseCardsArray.clear();
    cards.forEach((card) => this.homeShowcaseCardsArray.push(this.createHomeShowcaseCard(card)));
    if (this.homeShowcaseCardsArray.length === 0) {
      this.homeShowcaseCardsArray.push(this.createHomeShowcaseCard());
    }
  }

  private setHomeTestimonials(items: Array<{ text: string; author: string }>) {
    this.homeTestimonialsArray.clear();
    items.forEach((item) => this.homeTestimonialsArray.push(this.createHomeTestimonial(item)));
    if (this.homeTestimonialsArray.length === 0) {
      this.homeTestimonialsArray.push(this.createHomeTestimonial());
    }
  }

  private setAboutValues(items: Array<{ title: string; description: string }>) {
    this.aboutValuesArray.clear();
    items.forEach((item) => this.aboutValuesArray.push(this.createAboutValue(item)));
    if (this.aboutValuesArray.length === 0) {
      this.aboutValuesArray.push(this.createAboutValue());
    }
  }

  private setAboutTimeline(items: Array<{ title: string; detail: string }>) {
    this.aboutTimelineArray.clear();
    items.forEach((item) => this.aboutTimelineArray.push(this.createAboutTimeline(item)));
    if (this.aboutTimelineArray.length === 0) {
      this.aboutTimelineArray.push(this.createAboutTimeline());
    }
  }

  private setAboutHighlights(items: Array<{ title: string; detail: string }>) {
    this.aboutHighlightsArray.clear();
    items.forEach((item) => this.aboutHighlightsArray.push(this.createAboutHighlight(item)));
    if (this.aboutHighlightsArray.length === 0) {
      this.aboutHighlightsArray.push(this.createAboutHighlight());
    }
  }

  private setPartnerLogos(items: Array<{ name: string; url: string }>) {
    this.aboutPartnerLogosArray.clear();
    items.forEach((item) => this.aboutPartnerLogosArray.push(this.createPartnerLogo(item)));
    if (this.aboutPartnerLogosArray.length === 0) {
      this.aboutPartnerLogosArray.push(this.createPartnerLogo());
    }
  }

  private setPressKit(items: Array<{ title: string; description: string }>) {
    this.aboutPressKitArray.clear();
    items.forEach((item) => this.aboutPressKitArray.push(this.createPressKit(item)));
    if (this.aboutPressKitArray.length === 0) {
      this.aboutPressKitArray.push(this.createPressKit());
    }
  }

  private setContactCards(cards: Array<{ title: string; lines: string[] }>) {
    this.contactCardsArray.clear();
    cards.forEach((card) => this.contactCardsArray.push(this.createContactCard(card)));
    if (this.contactCardsArray.length === 0) {
      this.contactCardsArray.push(this.createContactCard());
    }
  }

  private setOptions(array: FormArray<FormGroup<{ value: StringControl; label: StringControl }>>, options: Array<{ value: string; label: string }>) {
    array.clear();
    options.forEach((item) => array.push(this.createOption(item)));
    if (array.length === 0) {
      array.push(this.createOption());
    }
  }

  private createValueLabel(value: string, label: string) {
    return this.formBuilder.group({
      value: this.formBuilder.control(value, Validators.required),
      label: this.formBuilder.control(label, Validators.required)
    });
  }

  private createHomeProofCard(card?: { pill: string; title: string; text: string }) {
    return this.formBuilder.group({
      pill: this.formBuilder.control(card?.pill ?? '', Validators.required),
      title: this.formBuilder.control(card?.title ?? '', Validators.required),
      text: this.formBuilder.control(card?.text ?? '', Validators.required)
    });
  }

  private createHomeServiceCard(card?: { title: string; text: string; items: string[] }) {
    const items = this.formBuilder.array<StringControl>([]);
    const values = card?.items ?? [''];
    values.forEach((item) => items.push(this.formBuilder.control(item)));
    return this.formBuilder.group({
      title: this.formBuilder.control(card?.title ?? '', Validators.required),
      text: this.formBuilder.control(card?.text ?? '', Validators.required),
      items
    });
  }

  private createHomeProcessStep(step?: { number: string; title: string; text: string }) {
    return this.formBuilder.group({
      number: this.formBuilder.control(step?.number ?? '', Validators.required),
      title: this.formBuilder.control(step?.title ?? '', Validators.required),
      text: this.formBuilder.control(step?.text ?? '', Validators.required)
    });
  }

  private createHomeShowcaseCard(card?: { pill: string; title: string; text: string; meta: string }) {
    return this.formBuilder.group({
      pill: this.formBuilder.control(card?.pill ?? '', Validators.required),
      title: this.formBuilder.control(card?.title ?? '', Validators.required),
      text: this.formBuilder.control(card?.text ?? '', Validators.required),
      meta: this.formBuilder.control(card?.meta ?? '', Validators.required)
    });
  }

  private createHomeTestimonial(item?: { text: string; author: string }) {
    return this.formBuilder.group({
      text: this.formBuilder.control(item?.text ?? '', Validators.required),
      author: this.formBuilder.control(item?.author ?? '', Validators.required)
    });
  }

  private createAboutValue(item?: { title: string; description: string }) {
    return this.formBuilder.group({
      title: this.formBuilder.control(item?.title ?? '', Validators.required),
      description: this.formBuilder.control(item?.description ?? '', Validators.required)
    });
  }

  private createAboutTimeline(item?: { title: string; detail: string }) {
    return this.formBuilder.group({
      title: this.formBuilder.control(item?.title ?? '', Validators.required),
      detail: this.formBuilder.control(item?.detail ?? '', Validators.required)
    });
  }

  private createAboutHighlight(item?: { title: string; detail: string }) {
    return this.formBuilder.group({
      title: this.formBuilder.control(item?.title ?? '', Validators.required),
      detail: this.formBuilder.control(item?.detail ?? '', Validators.required)
    });
  }

  private createPartnerLogo(item?: { name: string; url: string }) {
    return this.formBuilder.group({
      name: this.formBuilder.control(item?.name ?? '', Validators.required),
      url: this.formBuilder.control(item?.url ?? '', Validators.required)
    });
  }

  private createPressKit(item?: { title: string; description: string }) {
    return this.formBuilder.group({
      title: this.formBuilder.control(item?.title ?? '', Validators.required),
      description: this.formBuilder.control(item?.description ?? '', Validators.required)
    });
  }

  private createContactCard(card?: { title: string; lines: string[] }) {
    return this.formBuilder.group({
      title: this.formBuilder.control(card?.title ?? '', Validators.required),
      line1: this.formBuilder.control(card?.lines?.[0] ?? '', Validators.required),
      line2: this.formBuilder.control(card?.lines?.[1] ?? '')
    });
  }

  private createOption(item?: { value: string; label: string }) {
    return this.formBuilder.group({
      value: this.formBuilder.control(item?.value ?? '', Validators.required),
      label: this.formBuilder.control(item?.label ?? '', Validators.required)
    });
  }
}
