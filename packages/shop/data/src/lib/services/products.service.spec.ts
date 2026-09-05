import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import {
  Product,
  ApiResponse,
  PaginatedResponse,
  ProductFilter,
  ProductVariant,
} from '@mercatura/models';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://ecommerce-blog.devitor.local/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductsService,
      ],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    const mockProductsResponse: ApiResponse<PaginatedResponse<Product>> = {
      success: true,
      data: {
        data: [
          {
            id: '1' as string,
            name: 'Product 1' as string,
            slug: '' as string,
            description: 'Description 1' as string,
            image: '' as string,
            images: [] as string[],
            is_active: true as boolean,
            category_id: 1 as number,
            category: 'category name' as string,
            tags: [] as string[],
            rating: 4.5 as number,
            specs: '' as string,
            variants: [{
              id: 1 as number,
              label: 'Product Variant 1' as string,
              price: 100 as number,
              discount_price: 10 as number,
              stock: 3 as number,
            } as ProductVariant],
          },
          {
            id: '2' as string,
            name: 'Product 2' as string,
            slug: '' as string,
            description: 'Description 2' as string,
            image: '' as string,
            images: [] as string[],
            is_active: true as boolean,
            category_id: 1 as number,
            category: 'category name' as string,
            tags: [] as string[],
            rating: 3 as number,
            specs: '' as string,
            variants: [{
              id: 1 as number,
              label: 'Product Variant 1' as string,
              price: 200 as number,
              discount_price: 8 as number,
              stock: 3.5 as number,
            } as ProductVariant],
          },
        ],
        current_page: 1,
        last_page: 3,
        per_page: 12,
        total: 2,
        next_page_url: '',
        prev_page_url: '',
      },
    };

    it('should return products with default pagination', () => {
      service.getProducts().subscribe((response: any) => {
        expect(response.data.length).toBe(2);
        expect(response.total).toBe(2);
        expect(response.per_page).toBe(1);
      });

      const req = httpMock.expectOne(`${apiUrl}/products?page=1&pageSize=12`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProductsResponse);
    });

    it('should apply filters when provided', () => {
      const filter: ProductFilter = {
        search: '' as string,
        category: 'Electronics' as string,
        min_price: 50 as number,
        max_price: 150 as number,
        page: 1 as number,
      };

      service.getProducts(filter, 2, 20).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        `${apiUrl}/products?page=2&pageSize=20&category=Electronics&minPrice=50&maxPrice=150&inStock=true&searchTerm=test`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockProductsResponse);
    });

    it('should handle error response', () => {
      const errorResponse: ApiResponse<PaginatedResponse<Product>> = {
        data: {} as PaginatedResponse<Product>,
        success: false,
        error: 'Server error',
        message: '' as string,
      };

      // Silence console.error for this test
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      service.getProducts().subscribe((response: any) => {
        expect(response.data).toEqual([]);
        expect(response.total).toBe(0);
      });

      const req = httpMock.expectOne(`${apiUrl}/products?page=1&pageSize=12`);
      req.flush(errorResponse);

      consoleErrorSpy.mockRestore();
    });

    it('should handle network error', () => {
      // Silence console.error for this test
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      service.getProducts().subscribe((response: any) => {
        expect(response.data).toEqual([]);
        expect(response.total).toBe(0);
      });

      const req = httpMock.expectOne(`${apiUrl}/products?page=1&pageSize=12`);
      req.error(new ProgressEvent('Network error'));

      consoleErrorSpy.mockRestore();
    });
  });

  describe('getProductById', () => {
    const mockProduct: Product = {
      id: '1' as string,
      name: 'Product 1' as string,
      slug: '' as string,
      description: 'Description 1' as string,
      image: '' as string,
      images: [] as string[],
      is_active: true as boolean,
      category_id: 1 as number,
      category: '' as string,
      tags: [] as string[],
      rating: 4.5 as number,
      specs: '' as string,
      variants: [{
        id: 1 as number,
        label: '' as string,
        price: 100 as number,
        discount_price: 10 as number,
        stock: 3 as number,
      } as ProductVariant],
    };

    it('should return a product by id', () => {
      const mockResponse: ApiResponse<Product> = {
        success: true,
        data: mockProduct,
      };

      service.getProductById('1').subscribe((product) => {
        expect(product).toEqual(mockProduct);
      });

      const req = httpMock.expectOne(`${apiUrl}/products/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return null on error', () => {
      // Silence console.error for this test
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      service.getProductById('1').subscribe((product) => {
        expect(product).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/products/1`);
      req.error(new ProgressEvent('Network error'));

      consoleErrorSpy.mockRestore();
    });
  });

  describe('getCategories', () => {
    it('should return categories list', () => {
      const mockCategories = ['Electronics', 'Clothing', 'Books'];
      const mockResponse: ApiResponse<string[]> = {
        success: true,
        data: mockCategories,
      };

      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual(mockCategories);
      });

      const req = httpMock.expectOne(`${apiUrl}/products-metadata/categories`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return empty array on error', () => {
      // Silence console.error for this test
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual([]);
      });

      const req = httpMock.expectOne(`${apiUrl}/products-metadata/categories`);
      req.error(new ProgressEvent('Network error'));

      consoleErrorSpy.mockRestore();
    });
  });
});
