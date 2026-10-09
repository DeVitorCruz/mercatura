export interface ProfileTemplateConfig {
    redirectAfterSave?: string;
    showAvatar?: boolean;
    tabs?: ProfileTab[];
};

export interface ProfileTab {
    label: string;
    route: string;
    icon?: string;
};

export const DEFAULT_PROFILE_TABS: ProfileTab[] = [
    {
        label: 'Personal Info' as string,
        route: 'person' as string,
        icon: 'person' as string,
    } as ProfileTab,
    {
        label: 'Address' as string,
        route: 'address' as string,
        icon: 'geo-alt' as string,
    } as ProfileTab,
    {
        label: 'Social' as string,
        route: 'social' as string,
        icon: 'share' as string,
    } as ProfileTab,
];

