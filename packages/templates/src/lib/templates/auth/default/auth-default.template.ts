import { Route } from "@angular/router";
import { AuthTemplateConfig } from "../auth-template.interface";
import { TemplateInterface } from "@mercatura/models";

export interface TextAuthSlide {
    title: string;
    description: string;
};

export function buildAuthDefaultRoutes(config: AuthTemplateConfig = {}, slides?: TextAuthSlide[], imgPath?: string): Route[] {
    return [
        {
            path: '',
            loadComponent: () =>
                import('./layout/layout.component').then(m =>m.LayoutComponent),
            data: { slides: slides, imgPath },
            children: [
                {
                    path: '',
                    redirectTo: 'login',
                    pathMatch: 'full',
                },
                {
                    path: 'login',
                    loadComponent: () =>
                        import('@mercatura/shop/feature-auth')
                            .then(m => m.LoginComponent),
                    data: {
                        redirectTo: config.loginRedirectTo ?? '/dashboard',
                    },
                },
                {
                    path: 'register',
                    loadComponent: () =>
                        import('@mercatura/shop/feature-auth')
                            .then(m => m.RegisterComponent),
                    data: {
                        redirectTo: config.registerRedirectTo ?? '/dashboard',
                    },
                }      
            ],
        },
    ];
}

export const AUTH_DEFAULT_TEMPLATE: TemplateInterface = {
  name: 'auth-default',
  routes: buildAuthDefaultRoutes(),
};













