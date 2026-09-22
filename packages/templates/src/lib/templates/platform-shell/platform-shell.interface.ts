import { HeaderConfig } from "./default/header/header.interface";
import { AccordionItem } from "@mercatura/ui";

export interface NavItem extends AccordionItem {
    icon: string;
    route: string;
};

export interface PlatformShellConfig {
    navItems: NavItem[];
    brandName?: string;
    brandLogo?: string;
    headerConfig?: HeaderConfig;
};