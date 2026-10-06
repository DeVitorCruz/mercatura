import { FormField, FormFieldType } from "@mercatura/ui";

export const FIELDS: FormField[] = [
    {
        id: 'linkedin' as string,
        type: 'url' as FormFieldType,
        label: 'LinkedIn' as string,
        placeholder: 'https://linkedin.com/in/...' as string,
        customClassName: 'field-linkedin' as string,
    } as FormField,
    {
        id: 'twitter' as string,
        type: 'url' as FormFieldType,
        label: 'Twitter/X' as string,
        placeholder: 'https://twitter.com/...' as string,
        customClassName: 'field-twitter-x' as string,
    } as FormField,
    {
        id: 'instagram' as string,
        type: 'url' as FormFieldType,
        label: 'Instagram' as string,
        placeholder: 'https://instagram.com/...' as string,
        customClassName: 'field-instagram' as string,
    } as FormField,
] as FormField[];