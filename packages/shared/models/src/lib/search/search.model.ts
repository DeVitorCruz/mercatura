export interface SearchFilter {
    id: string;
    label: string;
    options: { value: string | number; label: string; }[];
};