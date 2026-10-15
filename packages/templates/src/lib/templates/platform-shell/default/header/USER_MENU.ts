import { DropdownItem } from "@mercatura/ui";

export const USER_MENU: DropdownItem[] = [
    {
        id:  'profile' as string,
        label:  'Profile' as string,
        icon:  'person' as string | undefined,
        route:  '/profile' as string | undefined,
        action:  undefined as string | undefined,
        divider: false as boolean | undefined,
        danger: false as boolean | undefined,
    } as DropdownItem,
    {
        id:  'settings' as string,
        label:  'Settings' as string,
        icon:  'gear' as string | undefined,
        route:  '/settings' as string | undefined,
        action:  undefined as string | undefined,
        divider: false as boolean | undefined,
        danger: false as boolean | undefined,
    } as DropdownItem,
    {
        id:  'divider' as string,
        label:  '' as string,
        icon:  undefined as string | undefined,
        route:  undefined as string | undefined,
        action:  undefined as string | undefined,
        divider: true as boolean | undefined,
        danger: false as boolean | undefined,
    } as DropdownItem,
    {
        id:  'logout' as string,
        label:  'Logout' as string,
        icon:  'box-arrow-right' as string | undefined,
        route:  undefined as string | undefined,
        action:  'logout' as string | undefined,
        divider: false as boolean | undefined,
        danger: true as boolean | undefined,
    } as DropdownItem,
] as DropdownItem[];