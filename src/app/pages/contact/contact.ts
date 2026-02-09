import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SiteContentService } from '../../services/site-content';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly siteContent = inject(SiteContentService);
  private readonly supabase = inject(SupabaseService).client;
  readonly submitted = signal(false);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly content = computed(() => this.siteContent.current().contact);

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

  async submitForm() {
    this.submitted.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    try {
      const payload = this.contactForm.getRawValue();
      const { error: insertError } = await this.supabase.from('contact_messages').insert({
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone || null,
        profile: payload.profile,
        project_type: payload.projectType,
        message: payload.message
      });

      if (insertError) {
        throw new Error(insertError.message);
      }

      const { error: fnError } = await this.supabase.functions.invoke('send-contact', {
        body: {
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          profile: payload.profile,
          projectType: payload.projectType,
          message: payload.message
        }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      this.successMessage.set(this.content().form.success);
      this.contactForm.reset({
        fullName: '',
        email: '',
        phone: '',
        profile: 'journalisme',
        projectType: 'portfolio',
        message: '',
        consent: false
      });
      this.submitted.set(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Envoi impossible pour le moment.';
      this.errorMessage.set(message);
    } finally {
      this.loading.set(false);
    }
  }
}
