import { createSlice } from "@reduxjs/toolkit";
import { logoutSuccess } from "../auth/authSlice";

const initialState = {
    loading: false,
    error: null,
    currentOrderId: ""
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrderStart: (state) => {
            state.loading = true
        },
        createOrderSuccess: (state, action) => {
            state.loading = false
            state.currentOrderId = action.payload
        },
        createOrderFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        finalizeOrderStart: (state) => {
            state.loading = true
        },
        finalizeOrderSuccess: (state) => {
            state.loading = false
            state.currentOrderId = ""
        },
        finalizeOrderFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logoutSuccess, () => initialState); // ✅ Reset state on logout
    }
})

const orderReducer = orderSlice.reducer
export const {
    createOrderStart,
    createOrderSuccess,
    createOrderFailed,
    finalizeOrderStart,
    finalizeOrderSuccess,
    finalizeOrderFailed,
} = orderSlice.actions
export default orderReducer