import { FormField } from '@mercatura/ui';

export const LOGIN_FORM_FIELDS: FormField[] = [
    {
        id: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'your@email.com',
        required: true,
        disabled: false, 
        onValueChange: (value: any) => value,
        customClassName: '',
    },
    {
        id: 'password',
        type: 'password',
        label: 'Password',
        placeholder: '••••••••',
        required: true,
        disabled: false, 
        onValueChange: (value: any) => value,
        customClassName: '',
    },
];