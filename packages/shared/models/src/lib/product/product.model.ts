import { TablePagination } from '../table/table.model';

// ------ Legacy models (shop app) ----------------------

export interface ProductVariant {
  id: number;
  label: string;
  price: number;
  discount_price?: number;
  stock: number;
};

export interface Product {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imageUrl?: string; // <- alias for image
  images?: string[];
  is_active: boolean;
  category_id: number;
  category?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  specs?: string;
  price?: number; // <- flat price for simple products
  inStock?: boolean; // <- stock stats
  variants?: ProductVariant[];
};

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
};

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export interface ProductFilters {
  search?: string;
  searchTerm?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
  inStock?: boolean;
};

// alias for backward compatibility with generated components
export type ProductFilter = ProductFilters;

// ------ Platform product models (seller API) ----------------------
export interface ProductAttribute {
  name: string;
  value: string;
};

export interface SellerProductVariant {
  id?: number;
  sku: string;
  price: string; // comes as string from API
  stock_quantity: number;
  image_path: string | null;
  attributes: ProductAttribute[];
};

export interface Seller {
  id: number;
  store_name: string;
  slug: string;
  status: string;
  description?: string;
};

export interface SellerProduct {
  id: number;
  seller_id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  category: import('../category/category.model').StorefrontCategory;
  seller: Seller;
  variants: SellerProductVariant[];
  created_at: string;
};

export interface ProductListResponse {
  products: SellerProduct[];
  pagination: TablePagination;
};

export interface CreateProductRequest {
  name: string;
  description: string;
  category_id: number;
  variants: Omit<SellerProductVariant, 'id' | 'image_path'>[];
};

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  category_id?: number;
  variants?: Omit<SellerProductVariant, 'id' | 'image_path'>[];
};



