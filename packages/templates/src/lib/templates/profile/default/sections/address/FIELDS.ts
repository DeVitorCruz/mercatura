import { FormField, FormFieldType } from "@mercatura/ui";

export const FIELDS: FormField[] = [
    {
        id: 'address_line1' as string,
        type: 'text' as FormFieldType,
        label: 'Address Line 1' as string,
        placeholder: 'Street address' as string,
        customClassName: 'field-address-line-1' as string,
    } as FormField,
    {
        id: 'address_line2' as string,
        type: 'text' as FormFieldType,
        label: 'Address Line 2' as string,
        placeholder: 'Apt, suite, etc.' as string,
        customClassName: 'field-address-line-2' as string,
    } as FormField,
    {
        id: 'city' as string,
        type: 'text' as FormFieldType,
        label: 'City' as string,
        placeholder: 'City' as string,
        customClassName: 'field-city' as string,
    } as FormField,
    {
        id: 'state' as string,
        type: 'text' as FormFieldType,
        label: 'State' as string,
        placeholder: 'State' as string,
        customClassName: 'field-state' as string,
    } as FormField,
    {
        id: 'postal_code' as string,
        type: 'text' as FormFieldType,
        label: 'Postal Code' as string,
        placeholder: '00000-000' as string,
        customClassName: 'field-postal-code' as string,
    } as FormField,
    {
        id: 'country' as string,
        type: 'text' as FormFieldType,
        label: 'Country' as string,
        placeholder: 'BR' as string,
        value: 'BR' as string,
        customClassName: 'field-country' as string,
    } as FormField,
] as FormField[];