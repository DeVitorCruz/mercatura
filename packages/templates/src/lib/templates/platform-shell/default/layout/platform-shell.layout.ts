import { Component, inject, signal, 
  PLATFORM_ID, computed,
  OnInit,
  OnDestroy, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderConfig } from '../header/header.interface';
import { PageBannerComponent } from '../page-banner/page-banner.component';

@Component({
  selector: 'lib-platform-shell-layout',
  imports: [MatSidenavModule, 
    HeaderComponent, SidebarComponent, FooterComponent,
    PageBannerComponent,
  ],
  templateUrl: './platform-shell.layout.html',
  styleUrl: './platform-shell.layout.scss',
})
export class PlatformShellLayout implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly NAV_ITEMS = this.route.snapshot.data['navItems'] ?? [];
  readonly BRAND_NAME = this.route.snapshot.data['brandName'] ?? 'Mercatura';
  readonly BRAND_LOGO = this.route.snapshot.data['brandLogo'] ?? '';
  readonly HEADER_CONFIG: HeaderConfig = this.route.snapshot.data['headerConfig'];

  // ---- Rsponsive state -------------------------------
  private readonly isDesktop = signal<boolean>(this._checkDesktop());
  readonly sidebarOpen =  signal<boolean>(this._checkDesktop());
  readonly sidebarMode = computed(() => this.isDesktop() ? 'side' : 'over' );

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  onSidebarClosed(): void {
    this.sidebarOpen.set(false);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    window.addEventListener('resize', this._resizeHandler);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    window.removeEventListener('resize', this._resizeHandler);
  }
 
  private _checkDesktop(): boolean {
    if (!this.isBrowser) return true;
    return window.innerWidth >= 1024;
  }

  private _resizeHandler: () => void = () => {
    const DESKTOP: boolean = this._checkDesktop();
    this.isDesktop.set(DESKTOP);
    this.sidebarOpen.set(DESKTOP);
  }
}
