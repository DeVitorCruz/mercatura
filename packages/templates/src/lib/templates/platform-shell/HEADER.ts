import { HeaderConfig, ImgPath, NavIcon } from "./default/header/header.interface";
import { HeaderUserConfig } from "./default/header/header.interface";
import { HEADER_USER } from "./HEADER_USER";

export const HEADER: HeaderConfig = {
    logo: {
        url: 'assets/logo/multikart-logo.png' as string,
        link: '/dashboard' as string,
    } as ImgPath,
    sidebarIcon: {
        name: 'menu-button-wide' as string,
        size: 20 as number,
    } as NavIcon,
    icons: [
        {
            name: 'bell' as string,
            size: 20 as number,
        } as NavIcon,
    ] as NavIcon[],
    hiddenIcon: {
        name: 'three-dots' as string,
        size: 22 as number,
    } as NavIcon,
    user: HEADER_USER as HeaderUserConfig | undefined,
} as HeaderConfig;