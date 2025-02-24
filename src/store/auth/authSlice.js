import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: null,
    },
    reducers: {
        onChecking: (state, /* action */ ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = null;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin } = authSlice.actions;