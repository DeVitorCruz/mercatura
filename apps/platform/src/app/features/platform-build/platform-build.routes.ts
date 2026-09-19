import { buildPlatformShellRoutes, NavItem, PlatformShellConfig } from "@mercatura/templates";
import { PLATFORM_NAV_ITEMS } from "./nav.config";
import { Route } from "@angular/router";
import { PAGES } from "../pages/PAGES";

export const platformBuildRoutes: Route[] = buildPlatformShellRoutes(
    {
        navItems: PLATFORM_NAV_ITEMS as NavItem[],
        brandName: 'Mercatura' as string,
        brandLogo: 'assets/logo/multikart-logo.png' as string,
    } as PlatformShellConfig,
    PAGES,
); 