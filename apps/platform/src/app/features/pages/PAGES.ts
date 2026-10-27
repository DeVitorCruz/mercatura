import { Route } from "@angular/router";
import { buildProfileRoutes } from "@mercatura/templates";
import { ProfileTemplateConfig } from "@mercatura/templates";

export const PAGES: Route[] = [
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/overview/overview.component')
                .then(m => m.OverviewComponent),
    },
    {
        path: 'profile',
        children: buildProfileRoutes({
            redirectAfterSave: '/dashboard',
        } as ProfileTemplateConfig),
    },
    { 
        path: 'products', 
        loadComponent: () => 
            import('./products/product-list/product-list.component')
                .then(m => m.ProductListComponent) 
    },
    {
        path: 'products/new',
        loadComponent: () =>
            import('./products/product-form/product-form.component')
                .then(m => m.ProductFormComponent),
    },
    {
        path: 'products/:id/edit',
        loadComponent: () =>
            import('./products/product-form/product-form.component')
                .then(m => m.ProductFormComponent),
    },
    // ----- Placeholer pages ----------------------
    { path: 'apps', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Apps' } },
    { path: 'orders', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Orders' } },
    { path: 'sales', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Sales' } },
    { path: 'users', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Users' } },
    { path: 'localization', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Localization' } },
    { path: 'settings', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Settings' } },
]; 