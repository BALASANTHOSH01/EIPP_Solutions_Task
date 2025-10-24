export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;           
    confirmPassword?: string; 
    dateOfBirth: string;
}

export interface ValidationErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    dateOfBirth?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
