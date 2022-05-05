import { createSlice } from "@reduxjs/toolkit";
import { TAuthState } from "@store";

const initialState: TAuthState = {
    id: "",
    username: "",
    email: "",
    accessToken: "",
    isLogged: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuth: (state: TAuthState, action) => {
            state = {...state, ...action.payload};
        },
        logout: (state: TAuthState) => {
            state = initialState;
        },
    },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;