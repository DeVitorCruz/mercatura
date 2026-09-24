import { AccordionItem } from "@mercatura/ui";

export const USERS_CHILD: AccordionItem[] = [
    { id: 0 as string | number,  label: 'User List' as string, icon: undefined as string | undefined, route: 'users' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 0 as (string | number) | undefined, },
    { id: 1 as string | number,  label: 'Create User' as string, icon: undefined as string | undefined, route: 'create-user' as string | undefined, children: undefined as AccordionItem[] | undefined, badge: 1 as (string | number) | undefined, },
];