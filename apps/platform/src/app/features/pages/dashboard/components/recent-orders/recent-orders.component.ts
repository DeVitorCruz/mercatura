import { DatePipe, NgClass } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecentOrder, formatRevenueBRL } from '@mercatura/models';

@Component({
  selector: 'app-recent-orders',
  imports: [NgClass, RouterLink, DatePipe],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss',
})
export class RecentOrdersComponent {
  public readonly orders: InputSignal<RecentOrder[]> =
    input.required<RecentOrder[]>();

  public formatRevenue(value: number): string {
    return formatRevenueBRL(value);
  }

  public getStatusClass(status: string): string {
    const MAP: Record<string, string> = {
      paid: 'badge--green', pending: 'badge--yellow',
      cancelled: 'badge--red', refunded: 'badge--gray',
    };
    return MAP[status] ?? 'badge--gray';
  }
}
