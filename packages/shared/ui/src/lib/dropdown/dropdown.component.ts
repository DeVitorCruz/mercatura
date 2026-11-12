import { Component, ElementRef, HostListener, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { DropdownItem } from './dropdown-item.interface';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'lib-dropdown',
  imports: [IconComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
 readonly items = input.required<DropdownItem[]>();
 readonly align = input<'left' | 'right'>('right');
 readonly minWidth = input<string>('180px');
 readonly itemAction = output<DropdownItem>();

 readonly isOpen = signal<boolean>(false);

  constructor(private readonly el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  onItemClick(item: DropdownItem): void {
    this.isOpen.set(false);
    this.itemAction.emit(item);
  }
}
