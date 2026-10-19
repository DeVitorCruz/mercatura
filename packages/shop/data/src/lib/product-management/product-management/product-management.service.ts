import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { 
    ProductListResponse, SellerProduct, 
    CreateProductRequest, UpdateProductRequest, 
    CategoryListResponse,
} from '@mercatura/models';

@Service()
export class ProductManagementService extends ApiService {
    // ------ Public ---------------------------------
    public getProducts(params: {
        search?: string;
        category_id?: number;
        page?: number;
    } = {}): Observable<ProductListResponse>  {
        const QUERY: Record<string, string | number> = {};
        if (params.search) QUERY['search'] = params.search;
        if (params.category_id) QUERY['category_id'] = params.category_id;
        if (params.page) QUERY['page'] = params.page;
        return this.get<ProductListResponse>('products', QUERY);
    }

    public getProductById(id: number): Observable<SellerProduct> {
        return this.get<SellerProduct>(`products/${id}`);
    }

    public getCategories(): Observable<CategoryListResponse> {
        return this.get<CategoryListResponse>('categories');
    }

    // ------ Seller (auth required) ---------------------------------
    public getSellerProducts(params: {
        search?: string;
        category_id?: number;
        page?: number;
    } = {}): Observable<ProductListResponse> {
        const QUERY: Record<string, string | number> = {};
        if (params.search) QUERY['search'] = params.search;
        if (params.category_id) QUERY['category_id'] = params.category_id;
        if (params.page) QUERY['page'] = params.page;
        return this.get<ProductListResponse>('seller/products', QUERY);
    }

    public createProduct(data: CreateProductRequest): Observable<{ message: string; product: SellerProduct; }> {
        return this.post<{ message: string; product: SellerProduct; }>('products/add', data);
    }

    public updateProduct(id: number, data: UpdateProductRequest): Observable<{ message: string; product: SellerProduct; }> {
        return this.patch<{ message: string; product: SellerProduct; }>(`products/${id}`, data);
    }

    public deleteProduct(id: number): Observable<{ message: string; }> {
        return this.delete<{ message: string; }>(`products/${id}`);
    }
}
