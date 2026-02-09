import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase';

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  profile: string;
  projectType: string;
  message: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactMessagesService {
  private readonly supabase = inject(SupabaseService).client;
  readonly items = signal<ContactMessage[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  async refresh() {
    this.loading.set(true);
    this.error.set(null);

    const { data, error } = await this.supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      this.error.set('Impossible de charger les messages.');
      this.loading.set(false);
      return;
    }

    const mapped = data.map((row) => ({
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      profile: row.profile,
      projectType: row.project_type,
      message: row.message,
      createdAt: row.created_at
    }));

    this.items.set(mapped);
    this.loading.set(false);
  }
}
