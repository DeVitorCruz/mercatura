import { Component, inject, signal, WritableSignal,
  OnInit
} from '@angular/core';
import { CategoryListResponse, SearchFilter, TableColumn } from '@mercatura/models';
import { TableAction } from '@mercatura/models';
import { ACTIONS } from './table-config/ACTIONS';
import { COLUMNS } from './table-config/COLUMNS';
import { ProductManagementService } from '@mercatura/shop/data';
import { SellerProduct } from '@mercatura/models';
import { ProductListResponse } from '@mercatura/models';
import { StorefrontCategory } from '@mercatura/models';
import { RouterLink } from '@angular/router';
import { DataTableComponent, SearchBarComponent, ConfirmDialogComponent } from '@mercatura/ui';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, DataTableComponent, 
    SearchBarComponent, ConfirmDialogComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private readonly PRODUCT_SVC: ProductManagementService = 
    inject(ProductManagementService);
  
  // ---- State ----------------------------
  public readonly loading: WritableSignal<boolean> = 
    signal<boolean>(false);
  public readonly products: WritableSignal<SellerProduct[]> =
    signal<SellerProduct[]>([]);
  public readonly pagination: WritableSignal<ProductListResponse['pagination'] | null> =
    signal<ProductListResponse['pagination'] | null>(null);
  public readonly categories: WritableSignal<StorefrontCategory[]> =
    signal<StorefrontCategory[]>([]); 
  public readonly deleting: WritableSignal<boolean> =
    signal<boolean>(false);
  public readonly deleteTarget: WritableSignal<SellerProduct | null> = 
    signal<SellerProduct | null>(null);

  // ---- Filters ----------------------------
  private search: string = '';
  private categoryId: number = 0;
  private currentPage: number = 1;

  // ---- Table config ----------------------------
  public readonly COLUMNS: TableColumn[] = 
    COLUMNS as TableColumn[];
  public readonly ACTIONS: TableAction[] = 
    ACTIONS as TableAction[];

  public readonly searchFilters: SearchFilter[] = [];

  public ngOnInit(): void {
    this._loadCategories();
    this._loadProducts();
  }

  private _loadProducts(): void {
    this.loading.set(true);
    this.PRODUCT_SVC.getSellerProducts({
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
    this.PRODUCT_SVC.getCategories().subscribe({
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

  public onSearch(term: string): void {
    this.search = term;
    this.currentPage = 1;
    this._loadProducts();
  }

  public onFilterChanger(event: { id: string; value: string | number; }): void {
    if (event.id === 'category') {
      this.categoryId = Number(event.value);
      this.currentPage = 1;
      this._loadProducts();
    }
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this._loadProducts();
  }

  public onRowAction(event: { action: string; row: SellerProduct }): void {
    if (event.action === 'delete') {
      this.deleteTarget.set(event.row);
    }
  }

  public onDeleteConfirmed(): void {
    const TARGET: SellerProduct = this.deleteTarget()!;
    if (!TARGET) return;

    this.loading.set(true);
    this.PRODUCT_SVC.deleteProduct(TARGET.id).subscribe({
      next: () => {
        this.deleteTarget.set(null);
        this.deleting.set(false);
        this._loadProducts();
      },
      error: () => this.deleting.set(false),
    });
  }

  public onDeleteCancelled(): void {
    this.deleteTarget.set(null);
  }

  public getVariantValue(row: any, path: string): any {
    if (path.includes('[0]')) {
      const KEY: string = path.split('[0].')[1];
      return row.variants?.[0]?.[KEY] ?? '-';
    }
    return path.split('.').reduce((obj: any, k: string) => obj?.[k], row);
  }
}

