import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  InputSignal,
  OutputEmitterRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@mercatura/models';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'shop-product-grid',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-gird.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridComponent {
  public readonly products: InputSignal<Product[]> = input.required<Product[]>();
  public readonly productSelect: OutputEmitterRef<Product> = output<Product>();
}
