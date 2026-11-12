import { Component, inject, signal,
  OnInit,
  computed
} from '@angular/core';
import { CategoryListResponse, SearchFilter, TableColumn } from '@mercatura/models';
import { TableAction } from '@mercatura/models';
import { ACTIONS } from './table-config/ACTIONS';
import { COLUMNS } from './table-config/COLUMNS';
import { PermissionService, ProductManagementService } from '@mercatura/shop/data';
import { SellerProduct } from '@mercatura/models';
import { ProductListResponse } from '@mercatura/models';
import { StorefrontCategory } from '@mercatura/models';
import { RouterLink } from '@angular/router';
import { DataTableComponent, SearchBarComponent, ConfirmDialogComponent } from '@mercatura/ui';
import { HasPermissionDirective } from '@mercatura/shop/data';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, DataTableComponent, 
    SearchBarComponent, ConfirmDialogComponent,
    HasPermissionDirective
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private readonly productSvc = inject(ProductManagementService);
  private readonly ps = inject(PermissionService);
  
  // ---- State ----------------------------
  readonly loading = signal<boolean>(false);
  readonly products = signal<SellerProduct[]>([]);
  readonly pagination = signal<ProductListResponse['pagination'] | null>(null);
  readonly categories = signal<StorefrontCategory[]>([]); 
  readonly deleting = signal<boolean>(false);
  readonly deleteTarget = signal<SellerProduct | null>(null);

  // ---- Filters ----------------------------
  private search: string = '';
  private categoryId: number = 0;
  private currentPage: number = 1;

  // ---- Table config ----------------------------
  readonly COLUMNS: TableColumn[] = COLUMNS;
  readonly actions = computed<TableAction[]>(() => 
    ACTIONS.filter(a => !a.permissions || this.ps.canAny(...a.permissions))
  );

  readonly searchFilters: SearchFilter[] = [];

  ngOnInit(): void {
    this._loadCategories();
    this._loadProducts();
  }

  private _loadProducts(): void {
    this.loading.set(true);
    this.productSvc.getSellerProducts({
        search: this.search || undefined,
        category_id: this.categoryId || undefined,
        page: this.currentPage,
    }).subscribe({
      next: (res: ProductListResponse) => {
        this.products.set(res.products);
        this.pagination.set(res.pagination);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  private _loadCategories(): void {
    this.productSvc.getCategories().subscribe({
      next: (res: CategoryListResponse) => {
        const APPROVED: StorefrontCategory[] = 
          res.categories.filter(c => c.status === 'approved');
        this.categories.set(APPROVED);
        // Update search filters dynamically
        this.searchFilters.push({
          id: 'category',
          label: 'All Categories',
          options: APPROVED.map((c: StorefrontCategory) => ({ 
            value: c.id, label: c.name, 
          })),
        });
      },
    });
  }

  onSearch(term: string): void {
    this.search = term;
    this.currentPage = 1;
    this._loadProducts();
  }

  onFilterChanger(event: { id: string; value: string | number; }): void {
    if (event.id === 'category') {
      this.categoryId = Number(event.value);
      this.currentPage = 1;
      this._loadProducts();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this._loadProducts();
  }

  onRowAction(event: { action: string; row: SellerProduct }): void {
    if (event.action === 'delete') {
      this.deleteTarget.set(event.row);
    }
  }

  onDeleteConfirmed(): void {
    const TARGET: SellerProduct = this.deleteTarget()!;
    if (!TARGET) return;
    this.deleting.set(true);
    this.productSvc.deleteProduct(TARGET.id).subscribe({
      next: () => {
        this.deleteTarget.set(null);
        this.deleting.set(false);
        this._loadProducts();
      },
      error: () => this.deleting.set(false),
    });
  }

  onDeleteCancelled(): void {
    this.deleteTarget.set(null);
  }

  getVariantValue(row: any, path: string): any {
    if (path.includes('[0]')) {
      const KEY: string = path.split('[0].')[1];
      return row.variants?.[0]?.[KEY] ?? '-';
    }
    return path.split('.').reduce((obj: any, k: string) => obj?.[k], row);
  }
}

