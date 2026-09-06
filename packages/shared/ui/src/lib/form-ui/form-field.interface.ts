export type FormFieldType = 
    'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'number' | 'tel';

export interface FormSelectOption {
    label: string;
    value: string | number;
};

export interface FormField {
    id: string;
    type: FormFieldType;
    label: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: FormSelectOption[]; // for select
    value?: any;
    onValueChange?: (value: any) => void;
    customClassName?: string;
};

export interface FormConfig {
    fields: FormField[];
    submitLabel?: string;
    loadingLabel?: string;
    columns?: 1 | 2;
    customClassName?: string;
};

