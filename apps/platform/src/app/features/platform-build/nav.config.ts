import { AccordionItem } from "@mercatura/ui";
import { ORDERS_CHILD } from "./children/orders.child";
import { SALES_CHILD } from "./children/sales.child";
import { USERS_CHILD } from "./children/users.child";
import { LOCALIZATION_CHILD } from "./children/localization.child";
import { SETTINGS_CHILD } from "./children/settings.child";

export const PLATFORM_NAV_ITEMS: AccordionItem[] = [
    { id: 0,  label: 'Dashboard', icon: 'grid', route: '/dashboard' },
    { id: 1,  label: 'Apps', icon: 'box', route: '/apps' },
    { id: 2,  label: 'Products', icon: 'cart', route: '/products' },
    { id: 3,  label: 'Orders', icon: 'receipt', route: '/orders', children: ORDERS_CHILD },
    { id: 4,  label: 'Sales', icon: 'graph-up', route: '/sales', children: SALES_CHILD },
    { id: 5,  label: 'Users', icon: 'people', route: '/users', children: USERS_CHILD },
    { id: 6,  label: 'Localization', icon: 'translate', route: '/localization', children: LOCALIZATION_CHILD },
    { id: 7,  label: 'Settings', icon: 'gear', route: '/settings', children: SETTINGS_CHILD },
];