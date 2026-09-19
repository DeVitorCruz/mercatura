import { TenantApp } from "./app.model";

export type TenantStatus = 
    'trial' | 'active' | 'suspended' | 'cancelled';

export interface Plan {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    price_monthly?: string;
    price_yearly?: string;
    max_apps: number;
    max_products: number;
    max_domains: number;
    features?: string;
};

export interface TenantSubscription {
    plan: Plan | string;
    plan_slug?: string;
    status?: string;
    current_period_end?: string;
    price_monthly?: string;
};

export interface Tenant {
    id: number;
    name: string;
    slug: string;
    status: TenantStatus;
    trial_ends_at?: string;
    trial_days_remaining?: number | null;
    subscription?: TenantSubscription;
    apps?: TenantApp[];
};

// --- Helpers ---------------------------------------
export function parsePlanFeatures(features?: string): Record<string, boolean> {
    if (!features) return {};
    try { return JSON.parse(features); } 
    catch { return {}; }
}

export function formatRevenueBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}


