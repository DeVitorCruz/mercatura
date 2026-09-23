import { HeaderConfig } from "./default/header/header.interface";
import { AccordionItem } from "@mercatura/ui";

export interface PlatformShellConfig {
    navItems: AccordionItem[];
    brandName?: string;
    brandLogo?: string;
    headerConfig?: HeaderConfig;
};