import { Component, inject, signal, WritableSignal, 
  PLATFORM_ID, Signal, computed,
  OnInit,
  OnDestroy, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderConfig } from '../header/header.interface';
import { PageBannerComponent } from '../page-banner/page-banner.component';
import { AccordionItem } from '@mercatura/ui';

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
  private readonly ROUTE: ActivatedRoute = 
    inject(ActivatedRoute);

  private readonly IS_BROWSER: boolean = 
    isPlatformBrowser(inject(PLATFORM_ID));

  public readonly NAV_ITEMS: AccordionItem[] =
    this.ROUTE.snapshot.data['navItems'] ?? [];

  public readonly BRAND_NAME: string = 
    this.ROUTE.snapshot.data['brandName'] ?? 'Mercatura';

  public readonly BRAND_LOGO: string =
    this.ROUTE.snapshot.data['brandLogo'] ?? '';

  public readonly HEADER_CONFIG: HeaderConfig =
    this.ROUTE.snapshot.data['headerConfig'];

  // ---- Rsponsive state -------------------------------
  private readonly isDesktop: WritableSignal<boolean> =
    signal<boolean>(this._checkDesktop());

  public readonly sidebarOpen: WritableSignal<boolean> = 
    signal<boolean>(this._checkDesktop());
  
  public readonly sidebarMode: Signal<MatDrawerMode> = 
    computed(() => 
      this.isDesktop() ? 'side' : 'over' 
    );

  public toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  public onSidebarClosed(): void {
    this.sidebarOpen.set(false);
  }

  public ngOnInit(): void {
    if (!this.IS_BROWSER) return;
    window.addEventListener('resize', this._resizeHandler);
  }

  public ngOnDestroy(): void {
    if (!this.IS_BROWSER) return;
    window.removeEventListener('resize', this._resizeHandler);
  }
 
  private _checkDesktop(): boolean {
    if (!this.IS_BROWSER) return true;
    return window.innerWidth >= 1024;
  }

  private _resizeHandler: () => void = 
    () => {
      const DESKTOP: boolean = this._checkDesktop();
      this.isDesktop.set(DESKTOP);
      this.sidebarOpen.set(DESKTOP);
    }
}
