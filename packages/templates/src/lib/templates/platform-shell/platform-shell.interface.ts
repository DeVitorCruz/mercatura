import { HeaderConfig } from "./default/header/header.interface";

export interface NavItem {
    label: string;
    icon: string;
    route: string;
    children?: NavItem[];
};

export interface PlatformShellConfig {
    navItems: NavItem[];
    brandName?: string;
    brandLogo?: string;
    headerConfig?: HeaderConfig;
};