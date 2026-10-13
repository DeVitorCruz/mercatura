import { Route } from "@angular/router";
import { buildProfileRoutes } from "@mercatura/templates";
import { ProfileTemplateConfig } from "@mercatura/templates";

export const PAGES: Route[] = [
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/overview/overview.component')
                .then(m => m.OverviewComponent),
    } as Route,
    {
        path: 'profile',
        children: buildProfileRoutes({
            redirectAfterSave: '/dashboard' as string,
        } as ProfileTemplateConfig),
    } as Route,
    // ----- Placeholer pages ----------------------
    { path: 'apps', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Apps' } } as Route,
    { path: 'products', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Products' } } as Route,
    { path: 'orders', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Orders' } } as Route,
    { path: 'sales', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Sales' } } as Route,
    { path: 'users', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Users' } } as Route,
    { path: 'localization', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Localization' } } as Route,
    { path: 'settings', loadComponent: () => import('./placeholder/placeholder.component').then(m => m.PlaceholderComponent), data: { title: 'Settings' } } as Route,
]; 