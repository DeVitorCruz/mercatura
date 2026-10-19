// DataCard
export interface CardAction {
    id: string;
    label: string;
    icon?: string;
    danger?: boolean;
};

export interface CardMeta {
    label: string;
    value: string | number;
};