export interface ImgPath {
    url: string;
    link: string;
};

export interface NavIcon {
    name: string;
    size: number;
};

export interface HeaderConfig {
    logo: ImgPath;
    sidebarIcon: NavIcon;
    icons: NavIcon[];
    hiddenIcon: NavIcon;
};