import { Component, inject, OnDestroy, OnInit, 
  signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformService } from '@mercatura/shop/data';
import { Dashboard, isLimitReached } from '@mercatura/models';
import { interval, Subscription, switchMap } from 'rxjs';
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
  private readonly platform = inject(PlatformService);
  private readonly router = inject(Router);

  readonly loading = signal<boolean>(false);
  readonly data = signal<Dashboard | null>(null);
  readonly error = signal<string | null>(null);

  private pollSub?: Subscription;

  ngOnInit(): void {  
    this._loadDashboard();
    this._startPolling();
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }
  
  private _loadDashboard(): void {
    this.loading.set(true);
    this.platform.getDashboard().subscribe({
      next: (data: Dashboard) => {
        this.data.set(data);
        this.loading.set(false);

        // no tenant -> onboarding
        if (!data.tenant) {
          this.router.navigate(['/onboarding']);
        }
      },
      error: (err: any) => {
        if (err.status === 404) {
          this.router.navigate(['/onboarding']);
        } else {
          this.error.set('Failed to load dashboard.');
          this.loading.set(false);
        }
      },
    });
  }

  private _startPolling(): void {
    this.pollSub = interval(30000).pipe(
      switchMap(() => this.platform.getDashboard())
    ).subscribe({
      next: (data) => this.data.set(data),
    });
  }

  canCreateApp(): boolean {
    const DATA: Dashboard | null = this.data();
    if (!DATA) return false;
    return !isLimitReached(DATA.limits.apps);
  }
}
