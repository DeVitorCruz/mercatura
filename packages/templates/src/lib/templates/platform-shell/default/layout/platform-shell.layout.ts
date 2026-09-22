import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavItem } from '../../platform-shell.interface';
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
export class PlatformShellLayout {
  private readonly ROUTE: ActivatedRoute = 
    inject(ActivatedRoute);

  public readonly NAV_ITEMS: NavItem[] =
    this.ROUTE.snapshot.data['navItems'] ?? [];
  
  public readonly BRAND_NAME: string = 
    this.ROUTE.snapshot.data['brandName'] ?? 'Mercatura';
  
  public readonly BRAND_LOGO: string =
    this.ROUTE.snapshot.data['brandLogo'] ?? '';

  public readonly HEADER_CONFIG: HeaderConfig =
      this.ROUTE.snapshot.data['headerConfig'];

  public readonly sidebarOpen: WritableSignal<boolean> = 
    signal<boolean>(false);

  public toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }
}
