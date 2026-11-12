import { DropdownItem } from "@mercatura/ui";

export const USER_MENU: DropdownItem[] = [
    {
        id:  'profile',
        label:  'Profile',
        icon:  'person',
        route:  '/profile',
        divider: false,
        danger: false,
    },
    {
        id:  'settings',
        label:  'Settings',
        icon:  'gear',
        route:  '/settings',
        divider: false,
        danger: false,
    },
    {
        id:  'divider',
        label:  '',
        divider: true,
        danger: false,
    },
    {
        id:  'logout',
        label:  'Logout',
        icon:  'box-arrow-right',
        action:  'logout',
        divider: false,
        danger: true,
    },
];