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


@Component({
  selector: 'lib-header',
  imports: [IconComponent, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly CACHE = inject(TenantCacheService);
  private readonly router = inject(Router);
  private readonly PROFILE = inject(ProfileService);

  readonly sidebarOpen = input<boolean>(false);
  readonly logo = input<string | null>(null);
  readonly userMenu = input.required<DropdownItem[]>();
  readonly headerConfig = input.required<HeaderConfig>();
  readonly menuToggle = output<void>();
  readonly dropdownOpen =signal<boolean>(false); 

  readonly userName = signal<string>('');
  readonly avatarUrl = signal<string | null>(null);
    
  @HostListener('document:click', ['$event']) 
    onDocumentClick(event: MouseEvent): void {
      if(!(event.target as HTMLElement).closest('.platform-header__user')) {
        this.closeDropdown(); 
      }
    }

  ngOnInit(): void {
    this.PROFILE.getProfile().subscribe({
      next: (data: ProfileResponse) => {
        this.userName.set(data.user.name as string);
        this.avatarUrl.set(data.user.avatar_url as string | null);
      },
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen.update(v => !v);
  }

  closeDropdown(): void {
    this.dropdownOpen.set(false);
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  onDropdownAction(action?: string, route?: string): void {
    this.closeDropdown();
    if (action === 'logout') {
      this.CACHE.reset();
      this.auth.logout(route).subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: () => {
          // clear session even if API fails
          this.router.navigate(['/auth/login']);
        }
      });
    } else if (route) {
      this.router.navigate([route]);
    }
  }

  onUserAction(item: DropdownItem): void {
    if (item.action === 'logout') {
      this.CACHE.reset();
      this.auth.logout(item.route).subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: () => this.router.navigate(['/auth/login']),
      });
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}
