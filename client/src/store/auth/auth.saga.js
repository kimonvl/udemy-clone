import {all, call, put, takeLatest} from "redux-saga/effects";
import { checkAuthenticatedFailure, checkAuthenticatedStart, checkAuthenticatedSuccess, loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, signUpFailure, signUpStart, signUpSuccess } from "./authSlice";
import { sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";

export function* login(action) {
    try {
        const res = yield call(sendAxiosPostJson, "auth/login", action.payload)
        if(res && res.data.success){
            yield put(loginSuccess(res.data.user));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Login Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(loginFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* signUp(action) {
    try {
        const res = yield call(sendAxiosPostJson, "auth/register", action.payload)
        if(res && res.data.success){
            yield put(signUpSuccess());
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(signUpFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* checkAuthenticated() {
    try {
        const res = yield call(sendAxiosPostJson, "auth/checkauthenticated")
        if(res && res.data.success){
            yield put(checkAuthenticatedSuccess());
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Check auth Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(checkAuthenticatedFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* logout() {
    try {
        const res = yield call(sendAxiosPostJson, "auth/logout")
        if(res && res.data.success){
            yield put(logoutSuccess());
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(logoutFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onLoginStart(){
    yield takeLatest(loginStart, login);
}

export function* onSignUpStart(){
    yield takeLatest(signUpStart, signUp);
}

export function* onCheckAuthenticatedStart(){
    yield takeLatest(checkAuthenticatedStart, checkAuthenticated);
}

export function* onLogoutStart(){
    yield takeLatest(logoutStart, logout);
}

export function* authSagas() {
    yield all([
        call(onLoginStart),
        call(onSignUpStart),
        call(onCheckAuthenticatedStart),
        call(onLogoutStart),
    ])
}