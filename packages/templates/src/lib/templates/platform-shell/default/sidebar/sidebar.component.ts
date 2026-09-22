import { Component, input, InputSignal } from '@angular/core';
import { NavItem } from '../../platform-shell.interface';
import { AccordionComponent } from '@mercatura/ui';

@Component({
  selector: 'lib-sidebar',
  imports: [AccordionComponent],
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
