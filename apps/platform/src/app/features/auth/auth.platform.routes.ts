import { buildAuthDefaultRoutes } from '@mercatura/templates';

export const authPlatformRoutes = buildAuthDefaultRoutes({
    loginRedirectTo: '/dashboard',
    registerRedirectTo: '/dashboard',
});