import { FormField, FormFieldType } from "@mercatura/ui";

export const FORM_FIELDS: FormField[] = [
    {
        id: 'name' as string,
        type: 'text' as FormFieldType,
        label: 'Business Name' as string,
        placeholder: 'My Shop' as string,
        required: true as boolean,
        value: '' as any,
        onValueChange: (value: any) => {  value; },
        customClassName: 'field-name' as string,
    } as FormField,
    {
        id: 'slug' as string,
        type: 'text' as FormFieldType,
        label: '' as string,
        placeholder: '' as string,
        required: true as boolean,
        value: '' as any,
        onValueChange: (value: any) => {  value; },
        customClassName: 'field-slug' as string,
    } as FormField,
] as FormField[];