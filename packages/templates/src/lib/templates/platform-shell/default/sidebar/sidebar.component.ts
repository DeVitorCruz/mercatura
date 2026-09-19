import { Component, input, InputSignal } from '@angular/core';
import { IconComponent } from '@mercatura/ui';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../platform-shell.interface';

@Component({
  selector: 'lib-sidebar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public readonly navItems: InputSignal<NavItem[]> = 
    input<NavItem[]>([]);
  public readonly brandName: InputSignal<string> = 
    input<string>('Mercatura');
  public readonly brandLogo: InputSignal<string> =
    input<string>('assets/logo/multikart-logo.png');
}
