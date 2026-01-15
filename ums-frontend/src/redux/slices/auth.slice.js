import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Async thunk for checking authentication status
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
        if (data.success) {
            const userResponse = await axios.get(`${backendUrl}/api/user/data`);
            return userResponse.data.userData;
        }
        return rejectWithValue("Not authenticated");
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Auth check failed");
    }
});

const initialState = {
    isLoggedIn: false,
    userData: null,
    loading: true,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            sessionStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.userData = action.payload;
                state.loading = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoggedIn = false;
                state.userData = null;
                state.loading = false;
            });
    },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;