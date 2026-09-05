import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductsService } from '@mercatura/shop/data';
import { Product, ProductVariant } from '@mercatura/models';
import { describe, it, beforeEach, expect, vi } from 'vitest';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductsService: Partial<ProductsService>;
  let mockRouter: Partial<Router>;

  const mockProducts: Product[] = [
    {
      id: '1' as string,
      name: 'Product 1' as string,
      slug: '' as string,
      description: 'Description 1' as string,
      image: '' as string,
      imageUrl: 'https://example.com/1.jpg' as string,
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
    },
    {
      id: '2' as string,
      name: 'Product 2' as string,
      slug: '' as string,
      description: 'Description 2' as string,
      image: '' as string,
      imageUrl: 'https://example.com/2.jpg' as string,
      images: [] as string[],
      is_active: true as boolean,
      category_id: 0 as number,
      category: 'Clothing' as string,
      tags: [] as string[],
      rating: 4.0 as number,
      reviewCount: 50 as number,
      specs: '' as string,
      price: 149.99 as number,
      inStock: true as boolean,
      variants: [] as ProductVariant[],
    },
  ];

  beforeEach(async () => {
    mockProductsService = {
      getProducts: vi.fn(),
      getCategories: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products and categories on init', () => {
    mockProductsService.getProducts;
    mockProductsService.getCategories;

    component.ngOnInit();

    expect(mockProductsService.getProducts).toHaveBeenCalled();
    expect(mockProductsService.getCategories).toHaveBeenCalled();
    expect(component.products()).toEqual(mockProducts);
  });

  it('should navigate to product detail when product is selected', () => {
    const product = mockProducts[0];

    component.onProductSelect(product);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products', product.id]);
  });

  it('should apply filters when search term changes', () => {
    mockProductsService.getProducts;

    component.searchTerm = 'Product 1';
    component.onSearchChange();

    expect(mockProductsService.getProducts).toHaveBeenCalledWith(
      expect.objectContaining({
        searchTerm: 'Product 1',
      }),
      1,
      12,
    );
  });

  it('should apply filters when category changes', () => {
    mockProductsService.getProducts;

    component.selectedCategory = 'Electronics';
    component.onFilterChange();

    expect(mockProductsService.getProducts).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'Electronics',
      }),
      1,
      12,
    );
  });
});
