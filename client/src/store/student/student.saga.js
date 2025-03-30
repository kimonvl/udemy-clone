import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchAllCoursesFailed, fetchAllCoursesStart, fetchAllCoursesSuccess, fetchCourseDetailsFailed, fetchCourseDetailsStart, fetchCourseDetailsSuccess, fetchCourseProgressFailed, fetchCourseProgressStart, fetchCourseProgressSuccess, fetchFeaturedCoursesFailed, fetchFeaturedCoursesStart, fetchFeaturedCoursesSuccess } from "./studentSlice";
import { sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";

export function* fetchFeaturedCourses() {
    try {
        const res = yield call(sendAxiosPostJson, "student/get-featured-courses")
        if (res && res.data.success) {
            yield put(fetchFeaturedCoursesSuccess(res.data.featuredCourses));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(fetchFeaturedCoursesFailed({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* fetchAllCourses(action) {
    try {
        console.log("sending filters", action.payload);
        
        const res = yield call(sendAxiosPostJson, "student/get-all-courses", {filters: action.payload})
        if (res && res.data.success) {
            yield put(fetchAllCoursesSuccess(res.data.allCourses));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(fetchAllCoursesFailed({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* fetchCourseDetails(action) {
    try {
        const res = yield call(sendAxiosPostJson, `student/get-course-details/${action.payload}`)
        if (res && res.data.success) {
            yield put(fetchCourseDetailsSuccess(res.data.course));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(fetchCourseDetailsFailed({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* fetchCourseProgress(action) {
    try {
        const res = yield call(sendAxiosPostJson, `student/get-course-progress/${action.payload}`)
        if (res && res.data.success) {
            yield put(fetchCourseProgressSuccess(res.data.course));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(fetchCourseProgressFailed({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onFetchFeaturedCoursesStart() {
    yield takeLatest(fetchFeaturedCoursesStart, fetchFeaturedCourses)
}

export function* onFetchAllCoursesStart() {
    yield takeLatest(fetchAllCoursesStart, fetchAllCourses)
}

export function* onFetchCourseDetailsStart() {
    yield takeLatest(fetchCourseDetailsStart, fetchCourseDetails)
}

export function* onFetchCourseProgressStart() {
    yield takeLatest(fetchCourseProgressStart, fetchCourseProgress)
}



export function* studentSagas() {
    yield all([
        call(onFetchFeaturedCoursesStart),
        call(onFetchAllCoursesStart),
        call(onFetchCourseDetailsStart),
        call(onFetchCourseProgressStart)
    ])
}