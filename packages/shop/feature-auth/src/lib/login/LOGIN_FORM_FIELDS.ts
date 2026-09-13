import { FormField, FormFieldType, FormSelectOption } from '@mercatura/ui';

export const LOGIN_FORM_FIELDS: FormField[] = [
    {
        id: 'email' as string,
        type: 'email' as string,
        label: 'Email' as string,
        placeholder: 'your@email.com' as string,
        required: true as boolean,
        disabled: false as boolean, 
        onValueChange: (value: any) => value,
        customClassName: '' as string,
    } as FormField,
    {
        id: 'password' as string,
        type: 'password' as string,
        label: 'Password' as string,
        placeholder: '••••••••' as string,
        required: true as boolean,
        disabled: false as boolean, 
        onValueChange: (value: any) => value,
        customClassName: '' as string,
    } as FormField,
] as FormField[];