import { Route } from "@angular/router";

export const PAGES: Route[] = [{
    path: 'dashboard',
    loadComponent: () =>
        import('./dashboard/overview/overview')
            .then(m => m.Overview), 
} as Route,]; 