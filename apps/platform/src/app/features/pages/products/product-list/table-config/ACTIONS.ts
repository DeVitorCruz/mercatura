import { TableAction } from "@mercatura/models";

export const ACTIONS: TableAction[] = [
    {
        id:  'edit',
        label:  'Edit',
        icon:  'pencil',
        danger: false,
        permissions: ['products.edit-own', 'products.edit-any'],
    },
    {
        id:  'delete',
        label:  'Delete',
        icon:  'trash',
        danger: true,
        permissions: ['products.delete-own', 'products.delete-any'],
    },
]; 