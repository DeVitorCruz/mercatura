import { AccordionItem } from "@mercatura/ui";
import { PRODUCTS_CHILD } from "./children/products.child";
import { ORDERS_CHILD } from "./children/orders.child";
import { SALES_CHILD } from "./children/sales.child";
import { USERS_CHILD } from "./children/users.child";
import { LOCALIZATION_CHILD } from "./children/localization.child";
import { SETTINGS_CHILD } from "./children/settings.child";

export const PLATFORM_NAV_ITEMS: AccordionItem[] = [
    { id: 0 as string | number,  label: 'Dashboard' as string, icon: 'grid' as string, route: '/dashboard' as string, children: PRODUCTS_CHILD as AccordionItem[] | undefined, badge: 0 as (string | number) | undefined, },
    { id: 1 as string | number,  label: 'Apps' as string, icon: 'box' as string, route: '/apps' as string, children: undefined as AccordionItem[] | undefined, badge: 1 as (string | number) | undefined, },
    { id: 2 as string | number,  label: 'Products' as string, icon: 'cart' as string, route: '/products' as string, children: undefined as AccordionItem[] | undefined, badge: 2 as (string | number) | undefined, },
    { id: 3 as string | number,  label: 'Orders' as string, icon: 'receipt' as string, route: '/orders' as string, children: ORDERS_CHILD as AccordionItem[] | undefined, badge: 3 as (string | number) | undefined, },
    { id: 4 as string | number,  label: 'Sales' as string, icon: 'graph-up' as string, route: '/sales' as string, children: SALES_CHILD as AccordionItem[] | undefined, badge: 4 as (string | number) | undefined, },
    { id: 5 as string | number,  label: 'Users' as string, icon: 'people' as string, route: '/users' as string, children: USERS_CHILD as AccordionItem[] | undefined, badge: 5 as (string | number) | undefined, },
    { id: 6 as string | number,  label: 'Localization' as string, icon: 'translate' as string, route: '/localization' as string, children: LOCALIZATION_CHILD as AccordionItem[] | undefined, badge: 6 as (string | number) | undefined, },
    { id: 7 as string | number,  label: 'Settings' as string, icon: 'gear' as string, route: '/settings' as string, children: SETTINGS_CHILD as AccordionItem[] | undefined,badge: 7 as (string | number) | undefined, },
    { id: 8 as string | number,  label: 'Login' as string, icon: 'box-arrow-in-right' as string, route: '/login' as string, children: undefined as AccordionItem[] | undefined,badge: 8 as (string | number) | undefined, },
];