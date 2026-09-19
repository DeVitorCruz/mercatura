import { NavItem } from "@mercatura/templates";

export const PLATFORM_NAV_ITEMS: NavItem[] = [
    { label: 'Dashboard' as string, icon: 'grid' as string, route: '/dashboard' as string, children: undefined as NavItem[] | undefined, },
    { label: 'Apps' as string, icon: 'box' as string, route: '/apps' as string, children: undefined as NavItem[] | undefined, },
    { label: 'Products' as string, icon: 'cart' as string, route: '/products' as string, children: undefined as NavItem[] | undefined, },
    { label: 'Orders' as string, icon: 'receipt' as string, route: '/orders' as string, children: undefined as NavItem[] | undefined, },
    { label: 'Sales' as string, icon: 'graph-up' as string, route: '/sales' as string, children: undefined as NavItem[] | undefined, },
    { label: 'Users' as string, icon: 'people' as string, route: '/users' as string, children: undefined as NavItem[] | undefined, },
    { label: 'Localization' as string, icon: 'translate' as string, route: '/localization' as string, children: undefined as NavItem[] | undefined, },
    { label: 'Settings' as string, icon: 'gear' as string, route: '/settings' as string, children: undefined as NavItem[] | undefined, },
];