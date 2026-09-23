import { buildPlatformShellRoutes, PlatformShellConfig } from "@mercatura/templates";
import { PLATFORM_NAV_ITEMS } from "./nav.config";
import { Route } from "@angular/router";
import { PAGES } from "../pages/PAGES";

import { AccordionItem } from "@mercatura/ui";

export const platformBuildRoutes: Route[] = buildPlatformShellRoutes(
    {
        navItems: PLATFORM_NAV_ITEMS as AccordionItem[],
        brandName: 'Mercatura' as string,
        brandLogo: 'assets/logo/multikart-logo.png' as string,
    } as PlatformShellConfig,
    PAGES,
); 