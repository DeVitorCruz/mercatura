import { Component, input, output } from '@angular/core';
import { TableColumn, TableAction, TablePagination } from '@mercatura/models';
import { NgClass, CurrencyPipe, DatePipe } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { MinPipe } from '../pipes/min/min-pipe.pipe';
import { HasPermissionDirective } from '@mercatura/shop/data';

@Component({
  selector: 'lib-data-table',
  imports: [DatePipe, NgClass, CurrencyPipe, 
    IconComponent, MinPipe, HasPermissionDirective
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  readonly columns = input.required<TableColumn[]>();
  readonly rows = input<any[]>([]);
  readonly actions = input<TableAction[]>([]);
  readonly pagination = input<TablePagination | null>(null);
  readonly loading = input<boolean>(false);
  readonly emptyText = input<string>('No records found.');

  readonly pageChange = output<number>();
  readonly sortChange = output<string>();
  readonly rowAction = output<{ action: string; row: any; }>();

  onAction(actionId: string, row: any): void {
    this.rowAction.emit({ action: actionId, row: row });
  }

  getValue(row: any, key: string): any {
    return key.split('.').reduce((obj, k) => obj?.[k], row);
  }

  getPages(): number[] {
    const p: TablePagination = this.pagination()!;
    if(!p) return [];
    return Array.from({ length: p.lastPage }, (_, i) => i + 1);
  }
}
