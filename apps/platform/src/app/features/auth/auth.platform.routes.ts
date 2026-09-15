import { buildAuthDefaultRoutes } from '@mercatura/templates';

export const AUTH_PLATFORM_ROUTES = buildAuthDefaultRoutes({
    loginRedirectTo: '/dashboard',
    registerRedirectTo: '/dashboard',
});