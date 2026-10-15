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
  public readonly items: InputSignal<DropdownItem[]> =
    input.required<DropdownItem[]>();
  public readonly align: InputSignal<'left' | 'right'> =
    input<'left' | 'right'>('right');
  public readonly minWidth: InputSignal<string> = 
    input<string>('180px');
  public readonly itemAction: OutputEmitterRef<DropdownItem> =
    output<DropdownItem>();

  public readonly isOpen: WritableSignal<boolean> =
    signal<boolean>(false);

  constructor(private readonly el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  public toggle(): void {
    this.isOpen.update(v => !v);
  }

  public onItemClick(item: DropdownItem): void {
    this.isOpen.set(false);
    this.itemAction.emit(item);
  }
}
