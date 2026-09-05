export interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    address?: UserAddress;
};

export interface UserAddress {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
};