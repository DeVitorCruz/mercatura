import { Tenant, TenantSubscription } from "./tenant.model";
import { TenantApp } from "./app.model";

export interface DashboardLimitItem {
    used: number;
    max: number;
};

export interface DashboardLimits {
    apps: DashboardLimitItem;
    products: DashboardLimitItem;
    domains: DashboardLimitItem;
};

export interface RecentOrder {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
    app_name: string;
};

export interface RecentContact {
    id: number;
    name: string;
    subject: string;
    status: string;
    created_at: string;
    app_name: string;
};

export interface Dashboard {
    tenant: Tenant;
    subscription: TenantSubscription;
    limits: DashboardLimits;
    apps: TenantApp[];
    recent_orders: RecentOrder[];
    recent_contacts: RecentContact[];
};

export interface AppDashboard {
    app: TenantApp;
    stats: {
        products: number;
        orders: number;
        orders_pending: number;
        orders_paid: number;
        revenue: number;
        contacts_unread: number;
        reviews_pending: number;
    }
};

// --- UI Helpers ---------------------------------------
export function getLimitPercent(item: DashboardLimitItem): number {
    if (item.max === 0) return 100;
    return Math.min(Math.round((item.used / item.max)*100), 100);
}

export function isLimitReached(item: DashboardLimitItem): boolean {
    return item.used >= item.max; 
}


