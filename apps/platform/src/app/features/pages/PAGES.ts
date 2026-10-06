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
]; 