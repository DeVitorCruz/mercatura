import { AccordionItem } from "@mercatura/ui";

export const DIGITAL_CHILD: AccordionItem[] = [
    { id: 0 as string | number,  label: 'Category' as string, icon: undefined as string | undefined, route: '/category' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 0 as (string | number) | undefined, },
    { id: 1 as string | number,  label: 'Sub Category' as string, icon: undefined as string | undefined, route: '/sub-category' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 1 as (string | number) | undefined, },
    { id: 2 as string | number,  label: 'Product List' as string, icon: undefined as string | undefined, route: '/product-list' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 2 as (string | number) | undefined, },
    { id: 3 as string | number,  label: 'Add Product' as string, icon: undefined as string | undefined, route: '/add-product' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 3 as (string | number) | undefined, },
];