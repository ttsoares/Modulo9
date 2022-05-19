import { createSlice } from '@reduxjs/toolkit';

/*
    uid: uuid
    name: string
    password: string
*/

export const slice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        login: (state, {payload}) => {
            state.user = payload;
        },
        logout: (state) => {
            state.user = undefined;
        }
    }
});

export default slice.reducer;

export const { login, logout } = slice.actions;

export const getUser = state => state.user.user;
