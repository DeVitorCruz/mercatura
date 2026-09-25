import { NgClass } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { DashboardLimits, TenantSubscription, 
  getLimitPercent, DashboardLimitItem, isLimitReached } from '@mercatura/models';

@Component({
  selector: 'app-stat-cards',
  imports: [NgClass],
  templateUrl: './stat-cards.component.html',
  styleUrl: './stat-cards.component.scss',
})
export class StatCardsComponent {
  public readonly limits: InputSignal<DashboardLimits> =
    input.required<DashboardLimits>();
  public readonly subscription: InputSignal<TenantSubscription> =
    input.required<TenantSubscription>();
  
  public getLimitPercent(item: DashboardLimitItem): number {
    return  getLimitPercent(item);
  }
  public isLimitReached(item: DashboardLimitItem): boolean {
    return isLimitReached(item);
  }
}
