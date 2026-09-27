import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { SelectableCardItem } from './selectable-card-item.interface';

@Component({
  selector: 'lib-selectable-card',
  imports: [],
  templateUrl: './selectable-card.component.html',
  styleUrl: './selectable-card.component.scss',
})
export class SelectableCardComponent {
  public readonly items: InputSignal<SelectableCardItem[]> =
    input.required<SelectableCardItem[]>();
  public readonly selectedId: InputSignal<string | number | null> =
    input<string | number | null>(null);
  public readonly columns: InputSignal<number> =
    input<number>(3);
  public readonly selected: OutputEmitterRef<string | number> =
    output<string | number>();

  public select(id: string | number): void {
    this.selected.emit(id);
  }

  public isSelected(id: string | number): boolean {
    return this.selectedId() === id;
  }
}
