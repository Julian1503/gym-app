export interface User {
    userId: number;
    username: string;
    password: string;
    email: string;
    memberId?: number;
    memberName?: string;
    memberLastname?: string;
    roles: string[];
}