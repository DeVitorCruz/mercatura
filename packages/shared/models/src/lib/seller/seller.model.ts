export interface Seller {
    id: number;
    user_id: number;
    store_name: string;
    slug: string;
    description?: string;
    store_logo?: string;
    store_banner?: string;
    commission_rate: number;
    is_marketplace: boolean;
    status: 'pending' | 'active' | 'suspended' | 'rejected';
    rejection_reason?: string;
};