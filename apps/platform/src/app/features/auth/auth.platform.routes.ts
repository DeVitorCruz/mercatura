import { Route } from '@angular/router';
import { buildAuthDefaultRoutes } from '@mercatura/templates';

export const authPlatformRoutes: Route[] = buildAuthDefaultRoutes({
    loginRedirectTo: '/dashboard',
    registerRedirectTo: '/dashboard',
    loginPath: 'platform/login',
    registerPath: 'platform/register',
});