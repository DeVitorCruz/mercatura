import { NgClass } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TenantApp, formatRevenueBRL } from '@mercatura/models'; 

@Component({
  selector: 'app-app-grid',
  imports: [NgClass, RouterLink],
  templateUrl: './app-grid.component.html',
  styleUrl: './app-grid.component.scss',
})
export class AppGridComponent {
  public readonly apps: InputSignal<TenantApp[]> =
    input.required<TenantApp[]>();
  public readonly canCreate: InputSignal<boolean> = 
    input<boolean>(true);
  
  public formatRevenue(value: number): string {
    return formatRevenueBRL(value);
  }

  public getStatusClass(status: string): string {
    const MAP: Record<string, string> = {
      trial: 'badge--blue', active: 'badge--green',
      suspended: 'badge--red', cancelled: 'badge--gray',
    };
    return MAP[status] ?? 'badge--gray';
  }
}
