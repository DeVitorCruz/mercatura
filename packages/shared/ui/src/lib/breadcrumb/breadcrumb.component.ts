import { Component, input, InputSignal } from '@angular/core';
import { BreadcrumbItem } from './breadcrumb-item.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  public readonly items: InputSignal<BreadcrumbItem[]> = 
    input<BreadcrumbItem[]>([]);
}
