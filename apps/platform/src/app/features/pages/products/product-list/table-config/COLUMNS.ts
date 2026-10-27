import { TableColumn } from "@mercatura/models";
import { ColumnType } from "@mercatura/models";

export const COLUMNS: TableColumn[] = [
    {
        key:  'name' as string,
        label:  'Product' as string,
        type: 'text' as ColumnType,
    } as TableColumn,
    {
        key:  'category.name' as string,
        label:  'Category' as string,
        type: 'text' as ColumnType,
    } as TableColumn,
    {
        key:  'variants[0].sku' as string,
        label:  'SKU' as string,
        type: 'text' as ColumnType,
    } as TableColumn,
    {
        key:  'variants[0].price' as string,
        label:  'price' as string,
        type: 'text' as ColumnType,
    } as TableColumn,
    {
        key:  'variants[0].stock_quantity' as string,
        label:  'Stock' as string,
        type: 'text' as ColumnType,
    } as TableColumn,
    {
        key:  'created_at' as string,
        label:  'Created' as string,
        type: 'date' as ColumnType,
    } as TableColumn,
] as TableColumn[];