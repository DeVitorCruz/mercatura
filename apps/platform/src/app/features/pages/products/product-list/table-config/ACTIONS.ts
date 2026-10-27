import { TableAction } from "@mercatura/models";

export const ACTIONS: TableAction[] = [
    {
        id:  'edit' as string,
        label:  'Edit' as string,
        icon:  'pencil' as string,
        danger: false as boolean | undefined,
    } as TableAction,
    {
        id:  'delete' as string,
        label:  'Delete' as string,
        icon:  'trash' as string,
        danger: true as boolean | undefined,
    } as TableAction,
] as TableAction[]; 