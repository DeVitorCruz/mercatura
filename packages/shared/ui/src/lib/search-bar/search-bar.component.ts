import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { SearchFilter } from '@mercatura/models';
import { IconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-search-bar',
  imports: [IconComponent, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  public readonly placeholder: InputSignal<string> =
    input<string>('Search...');
  public readonly filters: InputSignal<SearchFilter[]> =
    input<SearchFilter[]>([]);
  public readonly search: OutputEmitterRef<string> =
    output<string>();
  public readonly filterChange: OutputEmitterRef<{ id: string, value: string | number; }> =
    output<{ id: string; value: string | number; }>();

  public searchTerm: string = '';

  public onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  public onFilterChange(filterId: string, value: string | number): void {
    this.filterChange.emit({ id: filterId, value: value });
  }

  public clear(): void {
    this.searchTerm = '';
    this.search.emit('');
  }
}
