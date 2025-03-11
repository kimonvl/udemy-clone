import { all, call, put, takeLatest } from "redux-saga/effects";
import { createOrderFailed, createOrderStart, createOrderSuccess, finalizeOrderFailed, finalizeOrderStart, finalizeOrderSuccess } from "./orderSlice";
import { sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";

export function* createOrder(action) {
    try {
        const res = yield call(sendAxiosPostJson, `order/create-order`, action.payload.paymentPayload)
        if (res && res.data.success) {
            yield put(createOrderSuccess(res.data.orderId))
            action.payload.setAprovalUrl(res.data.approveUrl)
            toast.success(res.data.message)
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(createOrderFailed({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* finalizeOrder(action) {
    try {
        const res = yield call(sendAxiosPostJson, `order/finalize-order`, {paymentId: action.payload.paymentId, payerId: action.payload.payerId, orderId: action.payload.orderId})
        if (res && res.data.success) {
            yield put(finalizeOrderSuccess())
            action.payload.navigate("/home")
            toast.success(res.data.message)
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(finalizeOrderFailed({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onCreateOrderStart() {
    yield takeLatest(createOrderStart, createOrder)
}

export function* onFinalizeOrderStart() {
    yield takeLatest(finalizeOrderStart, finalizeOrder)
}

export function* orderSagas() {
    yield all([
        call(onCreateOrderStart),
        call(onFinalizeOrderStart),
    ])
}