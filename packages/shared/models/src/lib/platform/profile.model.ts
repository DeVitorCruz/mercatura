export interface UserProfile {
    id: number;
    user_id: number;
    avatar: string | null;
    bio: string | null;
    phone: string | null;
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string | null;
    website: string | null;
    linkedin: string | null;
    twitter: string | null;
    instagram: string | null;
};

export interface ProfileUser {
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
};

export interface ProfileResponse {
    user: ProfileUser;
    profile: UserProfile | null;
    roles: string[];
};

export interface UpdateProfileRequest {
    name?: string;
    bio?: string;
    phone?: string;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string,
    website?: string,
    linkedin?: string,
    twitter?: string,
    instagram?: string,
};



