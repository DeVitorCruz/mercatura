import { AccordionItem } from "@mercatura/ui";

export const SALES_CHILD: AccordionItem[] = [
    { id: 0 as string | number,  label: 'Orders' as string, icon: undefined as string | undefined, route: 'orders' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 0 as (string | number) | undefined, },
    { id: 1 as string | number,  label: 'Transactions' as string, icon: undefined as string | undefined, route: 'transactions' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 1 as (string | number) | undefined, },
];