import { Component, inject, OnDestroy, OnInit, 
  signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PlatformService } from '@mercatura/shop/data';
import { Dashboard, getLimitPercent, isLimitReached,
  DashboardLimitItem, formatRevenueBRL } from '@mercatura/models';
import { interval, Subscription, switchMap } from 'rxjs';
import { DatePipe, NgClass } from '@angular/common';
import { TrialBannerComponent } from '../components/trial-banner/trial-banner.component';
import { StatCardsComponent } from '../components/stat-cards/stat-cards.component';
import { AppGridComponent } from '../components/app-grid/app-grid.component';
import { RecentOrdersComponent } from '../components/recent-orders/recent-orders.component';
import { RecentContactsComponent } from '../components/recent-contacts/recent-contacts.component';

@Component({
  selector: 'app-overview',
  imports: [TrialBannerComponent, StatCardsComponent, 
    AppGridComponent, RecentOrdersComponent, RecentContactsComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit, OnDestroy {
  private readonly PLATFORM: PlatformService = 
    inject(PlatformService);
  private readonly ROUTER: Router = inject(Router);

  public readonly LOADING: WritableSignal<boolean> =
    signal<boolean>(false);
  public readonly DATA: WritableSignal<Dashboard | null> =
    signal<Dashboard | null>(null);
  public readonly ERROR: WritableSignal<string | null> =
    signal<string | null>(null);

  private pollSub?: Subscription;

  public ngOnInit(): void {  
    this._loadDashboard();
    this._startPolling();
  }

  public ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }
  
  private _loadDashboard(): void {
    this.LOADING.set(true);
    this.PLATFORM.getDashboard().subscribe({
      next: (data) => {
        this.DATA.set(data);
        this.LOADING.set(false);

        // no tenant -> onboarding
        if (!data.tenant) {
          this.ROUTER.navigate(['/onboarding/tenant']);
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.ROUTER.navigate(['/onboarding/tenant']);
        } else {
          this.ERROR.set('Failed to load dashboard.');
          this.LOADING.set(false);
        }
      },
    });
  }

  private _startPolling(): void {
    this.pollSub = interval(30000).pipe(
      switchMap(() => this.PLATFORM.getDashboard())
    ).subscribe({
      next: (data) => this.DATA.set(data),
    });
  }

  public canCreateApp(): boolean {
    const DATA: Dashboard | null = this.DATA();
    if (!DATA) return false;
    return !isLimitReached(DATA.limits.apps);
  }
}
