import { buildAuthDefaultRoutes } from '@mercatura/templates';

export const authPlatformRoutes = buildAuthDefaultRoutes({
    loginRedirectTo: '/onboarding',
    registerRedirectTo: '/onboarding',
});