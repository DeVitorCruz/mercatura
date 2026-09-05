import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  InputSignal,
  OutputEmitterRef,
  Signal,
  computed,
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product, ProductVariant } from '@mercatura/models';

@Component({
  selector: 'shop-product-card',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-card.componet.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  public readonly product: InputSignal<Product> = input.required<Product>();
  public readonly productClick: OutputEmitterRef<Product> = output<Product>();
  public readonly addToCart: OutputEmitterRef<Product> = output<Product>();

  public readonly IMAGE_URL: Signal<string> = computed(() => 
    this.product().imageUrl ?? this.product().image ?? 'assets/placeholder.jpg'
  );

  public readonly RATING: Signal<number> = computed(() => this.product().rating ?? 0);
  public readonly STARS: Signal<number[]> = computed(() => [1, 2, 3, 4, 5]);

  public readonly CURRENT_PRICE: Signal<number> = computed(() => {
    const VARIANT: ProductVariant = this.product().variants?.[0]!;
    return VARIANT?.discount_price ?? VARIANT.price ?? this.product().price ?? 0;
  });

  public readonly ORIGINAL_PRICE: Signal<number> = computed(() => {
    const VARIANT: ProductVariant = this.product().variants?.[0]!;
    return VARIANT?.price ?? this.product().price ?? 0;
  });

  public readonly HAS_DISCOUNT: Signal<boolean> = computed(() => {
    const VARIANT: ProductVariant = this.product().variants?.[0]!;
    return !!VARIANT?.discount_price;
  });

  public readonly IS_IN_STOCK: Signal<boolean> = computed(() => {
    if (this.product().inStock !== undefined) return this.product().inStock!;
    const VARIANT: ProductVariant = this.product().variants?.[0]!;
    return VARIANT ? VARIANT.stock > 0 : true;
  });

  public onProductClick(): void {
    this.productClick.emit(this.product());
  }

  public onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product());
  }

  public getStars(): boolean[] {
    const RATING: number = this.product().rating!;
    const fullStars: number = Math.floor(RATING);
    const hasHalfStar: boolean = RATING % 1 >= 0.5;

    return Array(this.STARS().length)
      .fill(false)
      .map((_, index) => {
        if (index < fullStars) return true;
        if (index === fullStars && hasHalfStar) return true;
        return false;
      });
  }
}
