import { AccordionItem } from "@mercatura/ui";
import { PHYSICAL_CHILD } from "./physical.child";
import { DIGITAL_CHILD } from "./digital.child";

export const PRODUCTS_CHILD: AccordionItem[] = [
    { id: 0,  label: 'Physical', children: PHYSICAL_CHILD, badge: 0 },
    { id: 1,  label: 'Digital', children: DIGITAL_CHILD, badge: 1 },
    { id: 2,  label: 'Product Review', badge: 2 },
];