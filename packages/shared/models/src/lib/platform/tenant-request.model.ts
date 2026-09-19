export interface CreateTenantRequest {
    name: string;
    slug: string;
    plan_slug?: string;
};

export interface UpdateTenantRequest {
    name: string;
};

export interface CreateTenantResponse {
    message: string;
    tenant: {
        id: number;
        name: string;
        slug: string;
        status: string;
    }
};