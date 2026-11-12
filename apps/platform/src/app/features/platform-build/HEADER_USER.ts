import { HeaderUserConfig } from "@mercatura/templates";

export const HEADER_USER: HeaderUserConfig = {
    avatarUrl: null,
    name: '',
    dropdownItems: [
        { 
            label: 'Profile',
            icon: 'person',
            route: '/profile',
        },
        { 
            label: 'Settings',
            icon: 'gear',
            route: '/settings',
        },
        { 
            label: 'Logout',
            icon: 'box-arrow-right',
            action: 'logout',
            route: 'platform/logout'
        },
    ],
};