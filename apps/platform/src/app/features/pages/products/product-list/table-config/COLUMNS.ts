import { TableColumn } from "@mercatura/models";

export const COLUMNS: TableColumn[] = [
    {
        key:  'name',
        label:  'Product',
        type: 'text',
    },
    {
        key:  'category.name',
        label:  'Category',
        type: 'text',
    },
    {
        key:  'variants[0].sku',
        label:  'SKU',
        type: 'text',
    },
    {
        key:  'variants[0].price',
        label:  'price',
        type: 'text',
    },
    {
        key:  'variants[0].stock_quantity',
        label:  'Stock',
        type: 'text',
    },
    {
        key:  'created_at',
        label:  'Created',
        type: 'date',
    },
];