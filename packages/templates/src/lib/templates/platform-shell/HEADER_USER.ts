import { HeaderUserConfig } from "./default/header/header.interface";

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
        },
    ],
};