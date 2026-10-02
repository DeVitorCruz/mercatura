import { Component, inject, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { IconComponent } from '@mercatura/ui';
import { HeaderConfig } from './header.interface';
import { AuthService } from '@mercatura/shop/data';
import { Router } from '@angular/router';
import { TenantCacheService } from '@mercatura/shop/data';

@Component({
  selector: 'lib-header',
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly AUTH: AuthService = 
    inject(AuthService);
  private readonly CACHE: TenantCacheService = 
    inject(TenantCacheService);
  private readonly ROUTER: Router = inject(Router);

  public readonly sidebarOpen: InputSignal<boolean> =
    input<boolean>(false);
  public readonly logo: InputSignal<string | null> = 
    input<string | null>(null);
  public readonly headerConfig: InputSignal<HeaderConfig> =
    input.required<HeaderConfig>();
  public readonly menuToggle: OutputEmitterRef<void> =
    output<void>();
  public readonly dropdownOpen: WritableSignal<boolean> =
    signal<boolean>(false); 

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
}
