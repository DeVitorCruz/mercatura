import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductGridComponent } from './product-grid.component';
import { Product, ProductVariant } from '@mercatura/models';
import { describe, it, beforeEach, expect, vi } from 'vitest';

describe('ProductCardComponent', () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;

  const mockProduct: Product = {
    id: '1' as string,
    name: 'Test Product' as string,
    slug: '' as string,
    description: 'Test Description' as string,
    image: '' as string,
    imageUrl: 'https://example.com/image.jpg' as string,
    images: [] as string[],
    is_active: true as boolean,
    category_id: 1 as number,
    category: 'Electronics' as string,
    tags: [] as string[],
    rating: 4.5 as number,
    reviewCount: 5 as number,
    specs: '' as string,
    price: 99.99 as number,
    inStock: true as boolean, 
    variants: [] as ProductVariant[],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product information', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('.product-name').textContent).toContain(
      'Test Product',
    );
    expect(compiled.querySelector('.product-category').textContent).toContain(
      'Electronics',
    );
    expect(compiled.querySelector('.product-price').textContent).toContain(
      '99.99',
    );
  });

  it('should display out of stock overlay when product is not in stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    fixture.componentRef.setInput('product', outOfStockProduct);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.out-of-stock-overlay')).toBeTruthy();
    expect(compiled.querySelector('.product-card').classList).toContain(
      'out-of-stock',
    );
  });
});
