import { DropdownItem } from "@mercatura/ui";

export interface ImgPath {
    url: string;
    link: string;
};

export interface NavIcon {
    name: string;
    size: number;
    dropdownItems?: DropdownItem[];
};

export interface HeaderDropdownItem {
    label: string;
    icon: string;
    route?: string;
    action?: 'logout' | string;
};

export interface HeaderUserConfig {
    avatarUrl?: string | null;
    name?: string;
    dropdownItems: HeaderDropdownItem[];
};

export interface HeaderConfig {
    logo: ImgPath;
    sidebarIcon: NavIcon;
    icons: NavIcon[];
    hiddenIcon: NavIcon;
    user?: HeaderUserConfig;
};