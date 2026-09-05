import { Product } from "./product.model";

export interface Wishlist {
    id: number;
    user_id: number;
    products: Product[];
};