import { FormField, FormFieldType, FormSelectOption } from "@mercatura/ui";

const NAME_FIELD: FormField = {
    id: 'name',
    type: 'text',
    label: 'Product Name',
    placeholder: 'Product name',
    required: true,
    onValueChange: (value: any) => { value; },
    customClassName: 'field-product-name',
};

const DESCRIPTION_FIELD: FormField = {
    id: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Product description',
    required: true,
    onValueChange: (value: any) => { value; },
    customClassName: 'field-product-description',
};

const CATEGORY_ID_FIELD: FormField = {
    id: 'category_id',
    type: 'select',
    label: 'Category',
    placeholder: 'Select category...',
    required: true,
    options: [], 
    onValueChange: (value: any) => { value; },
    customClassName: 'field-product-category',
};

export const FIELDS: FormField[] = [
    NAME_FIELD,
    DESCRIPTION_FIELD,
    CATEGORY_ID_FIELD,
];