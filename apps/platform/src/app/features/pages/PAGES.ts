import { Route } from "@angular/router";

export const PAGES: Route[] = [{
    path: 'dashboard',
    loadComponent: () =>
        import('./dashboard/overview/overview.component')
            .then(m => m.OverviewComponent), 
} as Route,]; 