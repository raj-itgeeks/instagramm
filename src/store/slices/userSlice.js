import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        loginRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
        }
    }


});

export const { loginRequest, loginSuccess, loginFailed, logout } = userSlice.action;
export default userSlice;