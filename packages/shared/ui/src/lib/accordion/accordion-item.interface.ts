export interface AccordionItem {
    id: string | number;
    label: string;
    icon?: string;
    children?: AccordionItem[];
    route?: string;
    badge?: string | number;
};