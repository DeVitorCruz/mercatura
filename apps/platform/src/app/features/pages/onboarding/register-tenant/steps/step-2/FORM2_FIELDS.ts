import { FormField, FormFieldType } from "@mercatura/ui";

export const FORM2_FIELDS: FormField[] = [
    {
        id: 'appName' as string,
        type: 'text' as FormFieldType,
        label: 'App Name' as string,
        placeholder: 'My Shop' as string,
        required: true as boolean,
        value: '' as any,
        onValueChange: (value: any) => {  value; },
        customClassName: 'field-app-name' as string,
    } as FormField,
] as FormField[];