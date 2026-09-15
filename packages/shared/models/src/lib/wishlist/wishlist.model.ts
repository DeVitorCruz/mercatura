import { Product } from "../product/product.model";

export interface Wishlist {
    id: number;
    user_id: number;
    products: Product[];
};