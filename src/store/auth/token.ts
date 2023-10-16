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
                };
            }
            return null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
}