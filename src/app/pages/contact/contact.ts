import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly i18n = inject(I18nService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly submitted = signal(false);

  readonly content = computed(() => {
    const lang = this.i18n.lang();
    if (lang === 'fr') {
      return {
        hero: {
          eyebrow: 'Contact',
          title: 'Parlons de votre projet de communication.',
          lead:
            'Décrivez votre besoin (presse, radio, TV, événementiel ou digital). Carnelle revient vers vous avec une proposition claire.'
        },
        cards: [
          {
            title: 'Coordonnées',
            lines: ['contact@carnellenguepi.com', '+33 6 42 18 77 10']
          },
          {
            title: 'Disponibilité',
            lines: ['Réponse sous 48h ouvrées.', 'Premier échange en visio (20 min).']
          },
          {
            title: 'Zone de travail',
            lines: ['Paris · Lyon · À distance', 'Interventions francophones']
          }
        ],
        form: {
          fullName: 'Nom complet',
          email: 'Email professionnel',
          phone: 'Téléphone',
          profile: 'Profil',
          projectType: 'Type de besoin',
          message: 'Votre message',
          consent: 'J’accepte d’être recontacté(e) à propos de mon projet.',
          submit: 'Envoyer la demande',
          success: 'Merci ! Je reviens vers vous très vite.'
        },
        errors: {
          fullName: 'Merci d’indiquer votre nom.',
          email: 'Veuillez saisir un email valide.',
          message: 'Merci d’ajouter un message détaillé.',
          consent: 'Merci de confirmer votre accord.'
        },
        profileOptions: [
          { value: 'journalisme', label: 'Journalisme' },
          { value: 'radio', label: 'Animateur radio' },
          { value: 'tv', label: 'Animateur TV / Présentateur' },
          { value: 'ceremonie', label: 'Maître de cérémonie' },
          { value: 'digital', label: 'Communication digitale' }
        ],
        projectOptions: [
          { value: 'portfolio', label: 'Portfolio complet' },
          { value: 'audit', label: 'Audit du portfolio' },
          { value: 'showreel', label: 'Showreel / montage vidéo' },
          { value: 'social', label: 'Stratégie social media' },
          { value: 'presse', label: 'Demande presse / médias' },
          { value: 'autre', label: 'Autre besoin' }
        ]
      };
    }

    return {
      hero: {
        eyebrow: 'Contact',
        title: 'Let’s talk about your communication project.',
        lead:
          'Describe your need (press, radio, TV, events or digital). Carnelle will get back with a clear proposal.'
      },
      cards: [
        {
          title: 'Contact',
          lines: ['contact@carnellenguepi.com', '+33 6 42 18 77 10']
        },
        {
          title: 'Availability',
          lines: ['Reply within 48 business hours.', 'First video call (20 min).']
        },
        {
          title: 'Working area',
          lines: ['Paris · Lyon · Remote', 'Francophone projects']
        }
      ],
      form: {
        fullName: 'Full name',
        email: 'Professional email',
        phone: 'Phone',
        profile: 'Profile',
        projectType: 'Project type',
        message: 'Your message',
        consent: 'I agree to be contacted about my project.',
        submit: 'Send request',
        success: 'Thank you! I will get back to you soon.'
      },
      errors: {
        fullName: 'Please provide your name.',
        email: 'Please enter a valid email.',
        message: 'Please add a detailed message.',
        consent: 'Please confirm your agreement.'
      },
      profileOptions: [
        { value: 'journalisme', label: 'Journalism' },
        { value: 'radio', label: 'Radio host' },
        { value: 'tv', label: 'TV host / Presenter' },
        { value: 'ceremonie', label: 'Master of ceremonies' },
        { value: 'digital', label: 'Digital communication' }
      ],
      projectOptions: [
        { value: 'portfolio', label: 'Full portfolio' },
        { value: 'audit', label: 'Portfolio audit' },
        { value: 'showreel', label: 'Showreel / video edit' },
        { value: 'social', label: 'Social media strategy' },
        { value: 'presse', label: 'Press / media request' },
        { value: 'autre', label: 'Other' }
      ]
    };
  });

  readonly profileOptions = computed(() => this.content().profileOptions);
  readonly projectOptions = computed(() => this.content().projectOptions);

  readonly contactForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    profile: ['journalisme', Validators.required],
    projectType: ['portfolio', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
    consent: [false, Validators.requiredTrue]
  });

  showError(controlName: keyof typeof this.contactForm.controls) {
    const control = this.contactForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  submitForm() {
    this.submitted.set(true);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactForm.reset({
      fullName: '',
      email: '',
      phone: '',
      profile: 'journalisme',
      projectType: 'portfolio',
      message: '',
      consent: false
    });
  }
}
