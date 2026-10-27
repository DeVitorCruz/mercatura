import { Component, HostListener, inject, input, InputSignal, OnInit, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { IconComponent } from '@mercatura/ui';
import { HeaderConfig } from './header.interface';
import { AuthService } from '@mercatura/shop/data';
import { Router } from '@angular/router';
import { TenantCacheService } from '@mercatura/shop/data';
import { DropdownComponent } from '@mercatura/ui';
import { ProfileService } from '@mercatura/shop/data';
import { ProfileResponse } from '@mercatura/models';
import { DropdownItem } from '@mercatura/ui';
import { USER_MENU } from './USER_MENU';

@Component({
  selector: 'lib-header',
  imports: [IconComponent, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private readonly AUTH: AuthService = 
    inject(AuthService);
  private readonly CACHE: TenantCacheService = 
    inject(TenantCacheService);
  private readonly ROUTER: Router = inject(Router);
  private readonly PROFILE: ProfileService = 
    inject(ProfileService);

  public readonly sidebarOpen: InputSignal<boolean> =
    input<boolean>(false);
  public readonly headerConfig: InputSignal<HeaderConfig> =
    input.required<HeaderConfig>();
  public readonly menuToggle: OutputEmitterRef<void> =
    output<void>();
  public readonly logo: InputSignal<string | null> = 
    input<string | null>(null);
  public readonly dropdownOpen: WritableSignal<boolean> =
    signal<boolean>(false); 

  public readonly userName: WritableSignal<string> =
    signal<string>('');
  public readonly avatarUrl: WritableSignal<string | null> =
    signal<string | null>(null);
    
  public readonly USER_MENU: DropdownItem[] = 
    USER_MENU as DropdownItem[];

  @HostListener('document:click', ['$event']) 
    onDocumentClick(event: MouseEvent): void {
      if(!(event.target as HTMLElement).closest('.platform-header__user')) {
        this.closeDropdown(); 
      }
    }

  public ngOnInit(): void {
    this.PROFILE.getProfile().subscribe({
      next: (data: ProfileResponse) => {
        this.userName.set(data.user.name as string);
        this.avatarUrl.set(data.user.avatar_url as string | null);
      },
    });
  }

  public toggleDropdown(): void {
    this.dropdownOpen.update(v => !v);
  }

  public closeDropdown(): void {
    this.dropdownOpen.set(false);
  }

  public onMenuToggle(): void {
    this.menuToggle.emit();
  }

  public onDropdownAction(action?: string, route?: string): void {
    this.closeDropdown();
    if (action === 'logout') {
      this.CACHE.reset();
      this.AUTH.logout().subscribe({
        next: () => this.ROUTER.navigate(['/auth/login']),
        error: () => {
          // clear session even if API fails
          this.ROUTER.navigate(['/auth/login']);
        }
      });
    } else if (route) {
      this.ROUTER.navigate([route]);
    }
  }

  public onUserAction(item: DropdownItem): void {
    if (item.action === 'logout') {
      this.CACHE.reset();
      this.AUTH.logout().subscribe({
        next: () => this.ROUTER.navigate(['/auth/login']),
        error: () => this.ROUTER.navigate(['/auth/login']),
      });
    } else if (item.route) {
      this.ROUTER.navigate([item.route]);
    }
  }
}
