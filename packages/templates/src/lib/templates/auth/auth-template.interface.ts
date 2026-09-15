import { TemplateInterface } from '@mercatura/models';
import { Route } from '@angular/router';

export interface AuthTemplateConfig {
    loginRedirectTo?: string;    
    registerRedirectTo?: string;
    showSocialLogin?: boolean;
    showRegisterLink?: boolean;
    showForgotPassword?: boolean;
    brandName?: string;
    brandLogo?: string;
};

export interface AuthTemplate extends TemplateInterface {
    config: AuthTemplateConfig;
    buildRoutes: (config?: AuthTemplateConfig) => Route[];
};