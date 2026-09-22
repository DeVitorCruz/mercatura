import { Component, computed, input, InputSignal, Signal, signal, WritableSignal } from '@angular/core';
import { AccordionItem } from './accordion-item.interface';
import { IconComponent } from '../icon/icon.component';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-accordion',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  public readonly items: InputSignal<AccordionItem[]> = 
    input<AccordionItem[]>([]);
  public readonly openId: WritableSignal<string | number | null> =
    signal<string | number | null>(null);

  public isOpen(id: string | number): Signal<boolean> {
    return computed<boolean>(() => this.openId() === id);
  }

  public toggle(id: string | number): void {
    this.openId.update(current => current === id ? null : id);
  }

  public hasChildren(item: AccordionItem): boolean {
    return !!item.children && item.children.length > 0;
  }
}
