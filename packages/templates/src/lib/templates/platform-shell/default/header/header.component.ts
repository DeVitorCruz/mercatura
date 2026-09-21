import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { IconComponent } from '@mercatura/ui';
import { HeaderConfig } from './header.interface';

@Component({
  selector: 'lib-header',
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly sidebarOpen: InputSignal<boolean> =
    input<boolean>(false);
  public readonly logo: InputSignal<string | null> = 
    input<string | null>(null);
  public readonly headerConfig: InputSignal<HeaderConfig> =
    input.required<HeaderConfig>();
  public readonly menuToggle: OutputEmitterRef<void> =
    output<void>();

  public onMenuToggle(): void {
    this.menuToggle.emit();
  }
}
