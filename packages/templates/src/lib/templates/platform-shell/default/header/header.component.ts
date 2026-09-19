import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { IconComponent } from '@mercatura/ui';

@Component({
  selector: 'lib-header',
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly sidebarOpen: InputSignal<boolean> =
    input<boolean>(true);
  public readonly menuToggle: OutputEmitterRef<void> =
    output<void>();

  public onMenuToggle(): void {
    this.menuToggle.emit();
  }
}
