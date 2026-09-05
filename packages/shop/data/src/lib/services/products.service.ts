import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Product,
  PaginatedResponse,
  ProductFilter,
} from '@mercatura/models';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {

  public getProducts(
    filter: ProductFilter = {},
    page: number = 1,
    pageSize: number = 12,
  ): Observable<PaginatedResponse<Product>> {
    const PARAMS: Record<string, string | number> = { page, per_page: pageSize };

    if (filter.searchTerm) PARAMS['search'] = filter.searchTerm!;
    if (filter.category) PARAMS['category'] = filter.category!;
    if (filter.min_price) PARAMS['search'] = filter.min_price!;
    if (filter.max_price) PARAMS['min_price'] = filter.max_price!;  
  
    return this.get<PaginatedResponse<Product>>('products', PARAMS).pipe(
      map(response => ({
        data: response.data as Product[],
        current_page: response.current_page as number,
        last_page: response.last_page as number,
        per_page: response.per_page as number,
        total: response.total as number,
        next_page_url: response.next_page_url as  string | null,
        prev_page_url: response.prev_page_url as string | null,
      }))
    );
  }

  public getProductById(id: number | string): Observable<Product> {
    return this.http.get<Product>(`products/${id}`);
  }

  public getCategories(): Observable<string[]> {
    return this.http.get<{ data: { name: string }[] }>('categories').pipe(
      map(response => response.data.map(c => c.name))
    );
  }
}
