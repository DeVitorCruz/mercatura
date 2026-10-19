import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CardAction, CardMeta } from '@mercatura/models';
import { DropdownItem } from '../dropdown/dropdown-item.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-data-card',
  imports: [NgClass, IconComponent, DropdownComponent],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.scss',
})
export class DataCardComponent {
  public readonly title: InputSignal<string> =
    input.required<string>();
  public readonly subtitle: InputSignal<string> =
    input<string>('');
  public readonly image: InputSignal<string | null> =
    input<string | null>(null);
  public readonly badge: InputSignal<{ label: string; class: string; } | null> =
    input<{ label: string; class: string; } | null>(null);
  public readonly meta: InputSignal<CardMeta[]> =
    input<CardMeta[]>([]);
  public readonly actions: InputSignal<CardAction[]> =
    input<CardAction[]>([]);
    
  public readonly cardAction: OutputEmitterRef<{ action: string; }> =
    output<{ action: string; }>();

  public get dropdownItems(): DropdownItem[] {
    return this.actions().map(a => ({
      id: a.id as string, label: a.label as string,
      icon: a.icon as string, danger: a.danger as boolean,
    } as DropdownItem));
  }

  public onAction(item: DropdownItem): void {
    this.cardAction.emit({ action: item.id });
  }
}
