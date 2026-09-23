import { AccordionItem } from "@mercatura/ui";
import { PHYSICAL_CHILD } from "./physical.child";
import { DIGITAL_CHILD } from "./digital.child";

export const PRODUCTS_CHILD: AccordionItem[] = [
    { id: 0 as string | number,  label: 'Physical' as string, icon: undefined as string | undefined, route: undefined as string | undefined, children: PHYSICAL_CHILD as AccordionItem[] | undefined, badge: 0 as (string | number) | undefined, },
    { id: 1 as string | number,  label: 'Digital' as string, icon: undefined as string | undefined, route: undefined as string | undefined, children: DIGITAL_CHILD as AccordionItem[] | undefined, badge: 1 as (string | number) | undefined, },
    { id: 2 as string | number,  label: 'Product Review' as string, icon: undefined as string | undefined, route: undefined as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 2 as (string | number) | undefined, },
];