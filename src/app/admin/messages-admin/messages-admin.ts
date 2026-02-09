import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ContactMessagesService } from '../../services/contact-messages';

@Component({
  selector: 'app-messages-admin',
  imports: [DatePipe],
  templateUrl: './messages-admin.html',
  styleUrl: './messages-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesAdmin {
  readonly messagesService = inject(ContactMessagesService);

  readonly messages = computed(() => this.messagesService.items());
  readonly loading = computed(() => this.messagesService.loading());
  readonly error = computed(() => this.messagesService.error());
  readonly selectedId = signal<string | null>(null);

  constructor() {
    void this.messagesService.refresh();
  }

  selectMessage(id: string) {
    this.selectedId.set(id);
  }

  clearSelection() {
    this.selectedId.set(null);
  }

  selectedMessage() {
    const id = this.selectedId();
    return this.messages().find((item) => item.id === id) ?? null;
  }
}
