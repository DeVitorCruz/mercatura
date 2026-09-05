import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';
import { ProductsService } from '@mercatura/shop/data';
import { Product, ProductVariant } from '@mercatura/models';
import { describe, it, beforeEach, expect, vi } from 'vitest';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockProductsService: Partial<ProductsService>;
  let mockRouter: Partial<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  const mockProduct: Product = {
    id: '1' as string | string,
    name: 'Test Product' as string,
    slug: '' as string,
    description: 'Test Description' as string,
    image: '' as string,
    imageUrl: 'https://example.com/image.jpg' as string,
    images: [] as string[],
    is_active: true as boolean,
    category_id: 0 as number,
    category: 'Electronics' as string,
    tags: [] as string[],
    rating: 4.5 as number,
    reviewCount: 100 as number,
    specs: '' as string,
    price: 99.99 as number,
    inStock: true as boolean, 
    variants: [] as ProductVariant[],
  } as Product;

  beforeEach(async () => {
    mockProductsService = {
      getProductById: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product on init', () => {
    mockProductsService.getProductById;

    component.ngOnInit();

    expect(mockProductsService.getProductById).toHaveBeenCalledWith('1');
    expect(component.product()).toEqual(mockProduct);
    expect(component.loading()).toBe(false);
    expect(component.error()).toBe(null);
  });

  it('should handle error when product not found', () => {
    mockProductsService.getProductById;

    component.ngOnInit();

    expect(component.error()).toBe('Product not found');
    expect(component.loading()).toBe(false);
  });

  it('should handle error when loading fails', () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    mockProductsService.getProductById;

    component.ngOnInit();

    expect(component.error()).toBe('Failed to load product details');
    expect(component.loading()).toBe(false);
    consoleSpy.mockRestore();
  });

  it('should calculate star ratings correctly', () => {
    component.product.set(mockProduct);

    const stars = component.getStars();

    expect(stars).toEqual([true, true, true, true, true]);
  });

  it('should handle add to cart action', () => {
    const alertSpy = vi
      .spyOn(window, 'alert')
      .mockImplementation(() => undefined);
    const consoleSpy = vi
      .spyOn(console, 'log')
      .mockImplementation(() => undefined);
    component.product.set(mockProduct);

    component.addToCart();

    expect(consoleSpy).toHaveBeenCalledWith('Adding to cart:', '1');
    expect(alertSpy).toHaveBeenCalledWith('Product added to cart!');
  });
});
