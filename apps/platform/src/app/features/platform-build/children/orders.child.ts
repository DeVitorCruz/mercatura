import { AccordionItem } from "@mercatura/ui";

export const ORDERS_CHILD: AccordionItem[] = [
    { id: 0 as string | number,  label: 'Order List' as string, icon: undefined as string | undefined, route: '/order/list' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 0 as (string | number) | undefined, },
    { id: 1 as string | number,  label: 'Order Tracking' as string, icon: undefined as string | undefined, route: '/order/tracking' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 1 as (string | number) | undefined, },
    { id: 2 as string | number,  label: 'Order Details' as string, icon: undefined as string | undefined, route: '/order-details' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 2 as (string | number) | undefined, },
];