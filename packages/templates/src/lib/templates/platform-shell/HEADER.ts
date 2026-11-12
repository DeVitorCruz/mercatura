import { HeaderConfig } from "./default/header/header.interface";
import { HEADER_USER } from "./HEADER_USER";

export const HEADER: HeaderConfig = {
    logo: {
        url: 'assets/logo/multikart-logo.png',
        link: '/dashboard',
    },
    sidebarIcon: {
        name: 'menu-button-wide',
        size: 20,
    },
    icons: [
        {
            name: 'bell',
            size: 20,
        },
    ],
    hiddenIcon: {
        name: 'three-dots',
        size: 22,
        dropdownItems: [
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
        ],
    },
    user: HEADER_USER,
};