import { NavItem } from "@mercatura/templates";
import { AccordionItem } from "@mercatura/ui";

export const PLATFORM_NAV_ITEMS: NavItem[] = [
    { id: 0 as string | number,  label: 'Dashboard' as string, icon: 'grid' as string, route: '/dashboard' as string, children: undefined as AccordionItem[] | undefined, badge: undefined as (string | number) | undefined, },
    { id: 1 as string | number,  label: 'Apps' as string, icon: 'box' as string, route: '/apps' as string, children: undefined as AccordionItem[] | undefined, badge: undefined as (string | number) | undefined, },
    { id: 2 as string | number,  label: 'Products' as string, icon: 'cart' as string, route: '/products' as string, children: undefined as AccordionItem[] | undefined, badge: undefined as (string | number) | undefined, },
    { id: 3 as string | number,  label: 'Orders' as string, icon: 'receipt' as string, route: '/orders' as string, children: undefined as AccordionItem[] | undefined, badge: undefined as (string | number) | undefined, },
    { id: 4 as string | number,  label: 'Sales' as string, icon: 'graph-up' as string, route: '/sales' as string, children: undefined as AccordionItem[] | undefined, badge: undefined as (string | number) | undefined, },
    { id: 5 as string | number,  label: 'Users' as string, icon: 'people' as string, route: '/users' as string, children: undefined as AccordionItem[] | undefined, badge: undefined as (string | number) | undefined, },
    { id: 6 as string | number,  label: 'Localization' as string, icon: 'translate' as string, route: '/localization' as string, children: undefined as AccordionItem[] | undefined, badge: undefined as (string | number) | undefined, },
    { id: 7 as string | number,  label: 'Settings' as string, icon: 'gear' as string, route: '/settings' as string, children: undefined as AccordionItem[] | undefined,badge: undefined as (string | number) | undefined, },
];