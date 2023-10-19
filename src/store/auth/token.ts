import jwtDecode from "jwt-decode";

export type TokenPayload = {
    sub: string;
    scope: string[];
    iss: string;
    isAdmin: boolean;
    exp: number;
    iat: number;
    email: string;
    scid: number | null;
    user: number;
    fullName: string;
};

export class TokenService {
    getTokenPayload() {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken : TokenPayload = jwtDecode(token);
                return {
                    scid: decodedToken.scid,
                    email: decodedToken.email,
                    scope: decodedToken.scope,
                    user: decodedToken.user,
                    fullName: decodedToken.fullName,
                };
            }
            return null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
}