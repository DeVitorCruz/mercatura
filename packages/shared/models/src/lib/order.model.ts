import { Product } from "./product.model";

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    product?: Product;
};

export interface Order {
    id: number;
    user_id: number;
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
    total: number;
    items: OrderItem[];
    created_at: string;
};