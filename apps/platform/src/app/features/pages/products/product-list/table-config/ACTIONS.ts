import { TableAction } from "@mercatura/models";

export const ACTIONS: TableAction[] = [
    {
        id:  'edit',
        label:  'Edit',
        icon:  'pencil',
        danger: false,
    },
    {
        id:  'delete',
        label:  'Delete',
        icon:  'trash',
        danger: true,
    },
]; 