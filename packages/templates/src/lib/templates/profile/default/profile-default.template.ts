import { Route } from "@angular/router";
import { ProfileTemplateConfig, DEFAULT_PROFILE_TABS } from "../profile.interface";

export function buildProfileRoutes(config: ProfileTemplateConfig = {}):Route[] {
    return [
        {
            path: '',
            loadComponent: () =>
                import('./layout/layout.component').then(m => m.LayoutComponent),
            data: {
                tabs: config.tabs ?? DEFAULT_PROFILE_TABS,
                redirectAfterSave: config.redirectAfterSave ?? '/dashboard',
                showAvatar: config.showAvatar ?? true,
            },
            children: [
                {
                    path: 'person',
                    loadComponent: () => 
                        import('./sections/personal-info/personal-info.component')
                            .then(m => m.PersonalInfoComponent),
                },
                {
                    path: 'address',
                    loadComponent: () => 
                        import('./sections/address/address.component')
                            .then(m => m.AddressComponent),
                },
                {
                    path: 'social',
                    loadComponent: () => 
                        import('./sections/social/social.component')
                            .then(m => m.SocialComponent),
                },
            ],
        } as Route,
    ] as Route[];
}

