import { FormField, FormFieldType } from "@mercatura/ui";

export const FIELDS: FormField[] = [
    {
        id: 'name' as string,
        type: 'text' as FormFieldType,
        label: 'Full Name' as string,
        placeholder: 'Your name' as string,
        required: true as boolean,
        customClassName: 'field-name' as string,
    } as FormField,
    {
        id: 'bio' as string,
        type: 'textarea' as FormFieldType,
        label: 'Bio' as string,
        placeholder: 'Tell us about yourself...' as string,
        customClassName: 'field-bio' as string,
    } as FormField,
    {
        id: 'phone' as string,
        type: 'tel' as FormFieldType,
        label: 'Phone' as string,
        placeholder: '+55 11 99999-9999' as string,
        customClassName: 'field-phone' as string,
    } as FormField,
    {
        id: 'website' as string,
        type: 'url' as FormFieldType,
        label: 'Website' as string,
        placeholder: 'https://yoursite.com' as string,
        customClassName: 'field-url' as string,
    } as FormField,
] as FormField[];