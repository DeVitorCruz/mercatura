import { buildPlatformShellRoutes } from "@mercatura/templates";
import { PLATFORM_NAV_ITEMS } from "./nav.config";
import { Route } from "@angular/router";
import { PAGES } from "../pages/PAGES";

export const platformBuildRoutes: Route[] = buildPlatformShellRoutes(
    {
        navItems: PLATFORM_NAV_ITEMS,
        brandName: 'Mercatura',
        brandLogo: 'assets/logo/multikart-logo.png',
    },
    PAGES,
); 