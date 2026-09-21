import { HeaderConfig, ImgPath, NavIcon } from "./default/header/header.interface";

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
        {
            name: 'person-circle' as string,
            size: 22 as number,
        } as NavIcon,
    ] as NavIcon[],
    hiddenIcon: {
        name: 'person-circle' as string,
        size: 22 as number,
    } as NavIcon,
} as HeaderConfig;