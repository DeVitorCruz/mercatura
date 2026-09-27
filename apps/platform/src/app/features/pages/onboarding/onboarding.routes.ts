import { Route } from "@angular/router";

export const onboardingRoutes: Route[] = [{
    path: '',
    loadComponent: () =>
        import('./register-tenant/register-tenant.component')
            .then(m => m.RegisterTenantComponent),
} as Route]; 