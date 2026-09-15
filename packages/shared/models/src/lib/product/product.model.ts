export interface ProductVariant {
  id: number;
  label: string;
  price: number;
  discount_price?: number;
  stock: number;
};

export interface Product {
  id: string | string;
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

