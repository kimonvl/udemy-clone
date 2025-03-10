import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true;
      state.user = action.payload
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    signUpStart: (state) => {
      state.loading = true
    },
    signUpSuccess: (state, action) => {
      state.loading = false
    },
    signUpFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    checkAuthenticatedStart: (state) => {
      state.loading = true
    },
    checkAuthenticatedSuccess: (state) => {
      state.loading = false
      state.isAuthenticated = true
    },
    checkAuthenticatedFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.user = null;
    },
    logoutStart: (state) => {
      state.loading = true
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.isAuthenticated = false;
      state.user = null
    },
    logoutFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
  
})

// ✅ Correct Export
const authReducer = authSlice.reducer
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  checkAuthenticatedStart,
  checkAuthenticatedSuccess,
  checkAuthenticatedFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,

} = authSlice.actions
export default authReducer;// ✅ Ensure you're exporting the reducer as default
