import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            return state;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            return state;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;