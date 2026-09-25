import { DatePipe, NgClass } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecentContact } from '@mercatura/models';

@Component({
  selector: 'app-recent-contacts',
  imports: [NgClass, RouterLink, DatePipe],
  templateUrl: './recent-contacts.component.html',
  styleUrl: './recent-contacts.component.scss',
})
export class RecentContactsComponent {
  public readonly contacts: InputSignal<RecentContact[]> =
    input.required<RecentContact[]>();
  
  public getStatusClass(status: string): string {
    const MAP: Record<string, string> = {
      open: 'badge--blue', closed: 'badge--green',
      pending: 'badge--yellow',
    };

    return MAP[status] ?? 'badge--gray';
  }
}
