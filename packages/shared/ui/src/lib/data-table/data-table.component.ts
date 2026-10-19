import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { TableColumn, TableAction, TablePagination } from '@mercatura/models';
import { NgClass, CurrencyPipe, DatePipe } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { MinPipe } from '../pipes/min/min-pipe.pipe';

@Component({
  selector: 'lib-data-table',
  imports: [DatePipe, NgClass, CurrencyPipe, 
    IconComponent, MinPipe
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  public readonly columns: InputSignal<TableColumn[]> =
    input.required<TableColumn[]>();
  public readonly rows: InputSignal<any[]> = 
    input<any[]>([]);
  public readonly actions: InputSignal<TableAction[]> =
    input<TableAction[]>([]);
  public readonly pagination: InputSignal<TablePagination | null> =
    input<TablePagination | null>(null);
  public readonly loading: InputSignal<boolean> =
    input<boolean>(false);
  public readonly emptyText: InputSignal<string> =
    input<string>('No records found.');

  public readonly pageChange: OutputEmitterRef<number> =
    output<number>();
  public readonly sortChange: OutputEmitterRef<string> =
    output<string>();
  public readonly rowAction: OutputEmitterRef<{ action: string; row: any; }> =
    output<{ action: string; row: any; }>();

  public onAction(actionId: string, row: any): void {
    this.rowAction.emit({ action: actionId, row: row });
  }

  public getValue(row: any, key: string): any {
    return key.split('.').reduce((obj, k) => obj?.[k], row);
  }

  public getPages(): number[] {
    const p: TablePagination = this.pagination()!;
    if(!p) return [];
    return Array.from({ length: p.lastPage }, (_, i) => i + 1);
  }
}
