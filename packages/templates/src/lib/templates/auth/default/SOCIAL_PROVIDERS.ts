import { SocialProvider } from '@mercatura/models';

export const SOCIAL_PROVIDERS: SocialProvider[] = [
    { name: 'Google' as string, icon: 'google' as string, url: '/auth/social/google' as string, } as SocialProvider,
    { name: 'Facebook' as string, icon: 'facebook' as string, url: '/auth/social/facebook' as string, } as SocialProvider,
    { name: 'Linkedin' as string, icon: 'linkedin' as string, url: '/auth/social/linkedin' as string, } as SocialProvider,
    { name: 'Github' as string, icon: 'github' as string, url: '/auth/social/github' as string, } as SocialProvider,
];