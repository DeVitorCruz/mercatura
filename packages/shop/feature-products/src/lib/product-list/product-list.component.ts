import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  ChangeDetectionStrategy,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '@mercatura/shop/data';
import { Product, ProductFilter } from '@mercatura/models';
import {
  ProductGridComponent,
  LoadingSpinnerComponent,
  ErrorMessageComponent,
} from '@mercatura/shop/shared-ui';

@Component({
  selector: 'shop-product-list',
  imports: [
    CommonModule,
    FormsModule,
    ProductGridComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly router: Router = inject(Router);

  // State signals
  public readonly products: WritableSignal<Product[]> = signal<Product[]>([]);
  public readonly totalProducts: WritableSignal<number> = signal(0);
  public readonly currentPage: WritableSignal<number> = signal(1);
  public readonly totalPages: WritableSignal<number> = signal(0);
  public readonly categories: WritableSignal<string[]> = signal<string[]>([]);
  public readonly loading: WritableSignal<boolean> = signal(false);
  public readonly error: WritableSignal<string | null> = signal<string | null>(null);

  // Filter state
  public searchTerm: string = '';
  public selectedCategory: string = '';
  public inStockOnly: boolean = false;

  // Computed values
  public readonly hasMorePages = computed(() => this.totalPages() > 1);

  public ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  public loadCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (err) => console.error('Error loading categories:', err),
    });
  }

  public loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    const filter: ProductFilter = {};

    if (this.searchTerm) {
      filter.searchTerm = this.searchTerm;
    }
    if (this.selectedCategory) {
      filter.category = this.selectedCategory;
    }
    if (this.inStockOnly) {
      filter.inStock = true;
    }

    this.productsService.getProducts(filter, this.currentPage(), 12).subscribe({
      next: (response: any) => {
        this.products.set(response.items);
        this.totalProducts.set(response.total);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set('Failed to load products. Please try again.');
        this.loading.set(false);
        console.error('Error loading products:', err);
      },
    });
  }

  public onSearchChange(): void {
    this.currentPage.set(1);
    this.loadProducts();
  }

  public onFilterChange(): void {
    this.currentPage.set(1);
    this.loadProducts();
  }

  public onProductSelect(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  public nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
      this.loadProducts();
    }
  }

  public previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
      this.loadProducts();
    }
  }
}
