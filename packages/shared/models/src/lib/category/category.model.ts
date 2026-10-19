// ------ Legacy ----------------------
export interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string;
    parent_id?: number;
};

// ------ Storefront category (seller API) ----------------------
export interface StorefrontCategory {
    id: number;
    name: string;
    slug: string;
    status: 'pending' | 'approved' | 'rejected';
    is_active: boolean;
    parent_id: number | null;
    children: StorefrontCategory[];
};

export interface CategoryListResponse {
    categories: StorefrontCategory[];
};


