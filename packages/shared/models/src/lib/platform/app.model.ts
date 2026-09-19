export interface AppType {
    id: number;
    name: string;
    slug: string;
};

export interface AppTheme {
    id: number;
    name: string;
    slug: string;
    description?: string;
    is_default?: boolean;
    is_active?: boolean;
};

export interface AppDomain {
    id: number;
    domain: string;
    type: string;
    is_primary: boolean;
    is_verified: boolean;
    instructions?: {
        type: string;
        name: string;
        value: string;
    };
};

export interface AppStats {
    products: number;
    orders: number;
    orders_pending: number;
    orders_paid: number;
    revenue: number;
    contacts_unread: number;
    reviews_pending: number;
};

export interface TenantApp {
    id: number;
    name: string;
    slug: string;
    status: string;
    db_name?: string;
    app_type: AppType | string;
    theme: AppTheme | string;
    primary_domain?: string;
    domains_count?: number;
    domains?: AppDomain[]; 
    stats?: AppStats;
};

// --- Requests ---------------------------------------
export interface CreateAppRequest {
    name: string;
    app_type_slug: string;
    theme_slug: string;
};

export interface CreateAppResponse {
    message: string;
    app: TenantApp;
    subdomain: string;
};

export interface UpdateThemeRequest {
    theme_slug: string;
};
