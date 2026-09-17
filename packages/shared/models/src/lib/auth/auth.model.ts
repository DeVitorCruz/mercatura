export interface LoginRequest {
    email: string;
    password: string;
};

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at?: string;
};

export interface AuthResponse {
    user: AuthUser;
    access_token: string;
};
