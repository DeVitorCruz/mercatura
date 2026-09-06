import { FormField, FormFieldType, FormSelectOption } from '@mercatura/ui';

export const REGISTER_FORM_FIELDS: FormField[] = [
    {
        id: 'name' as string,
        type: 'text' as FormFieldType,
        label: 'Full Name' as string,
        placeholder: 'Your full name' as string,
        required: true as boolean,
        disabled: false as boolean, 
        onValueChange: (value: any) => value,
        customClassName: '' as string,
    } as FormField,
    {
        id: 'email' as string,
        type: 'email' as FormFieldType,
        label: 'Email' as string,
        placeholder: 'your@email.com' as string,
        required: true as boolean,
        disabled: false as boolean, 
        onValueChange: (value: any) => value,
        customClassName: '' as string,
    } as FormField,
    {
        id: 'password' as string,
        type: 'password' as FormFieldType,
        label: 'Password' as string,
        placeholder: '••••••••' as string,
        required: true as boolean,
        disabled: false as boolean, 
        onValueChange: (value: any) => value,
        customClassName: '' as string,
    } as FormField,
    {
        id: 'password_confirmation' as string,
        type: 'password' as FormFieldType,
        label: 'Confirm Password' as string,
        placeholder: '••••••••' as string,
        required: true as boolean,
        disabled: false as boolean, 
        onValueChange: (value: any) => value,
        customClassName: '' as string,
    } as FormField,
] as FormField[];