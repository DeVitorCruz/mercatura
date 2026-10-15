export interface DropdownItem {
    id: string;
    label: string;
    icon?: string;
    route?: string;
    action?: string;
    divider?: boolean;
    danger?: boolean;
};