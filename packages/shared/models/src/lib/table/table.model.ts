// DataTable
export type ColumnType = 'text' | 'badge' | 'currency' | 'date' | 'actions' | 'image';

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    type?: ColumnType;
    badgeMap?: Record<string, string>; // status -> css class
};

export interface TableAction {
    id: string;
    label: string;
    icon?: string;
    danger?: boolean;
};

export interface TablePagination {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;  
};