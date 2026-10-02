import { HeaderDropdownItem, HeaderUserConfig } from "./default/header/header.interface";

export const HEADER_USER: HeaderUserConfig = {
    avatarUrl: null as string | null,
    name: '' as string,
    dropdownItems: [
        { 
            label: 'Profile' as string,
            icon: 'person' as string,
            route: '/profile' as string,
        } as HeaderDropdownItem,
        { 
            label: 'Settings' as string,
            icon: 'gear' as string,
            route: '/settings' as string,
        } as HeaderDropdownItem,
        { 
            label: 'Logout' as string,
            icon: 'box-arrow-right' as string,
            action: 'logout' as 'logout' | string,
        } as HeaderDropdownItem,
    ] as HeaderDropdownItem[],
} as HeaderUserConfig;