import { all, call, put, takeLatest } from "redux-saga/effects";
import { checkCourseAccess, fetchAllCoursesFailed, fetchAllCoursesStart, fetchAllCoursesSuccess, fetchCourseDetailsFailed, fetchCourseDetailsStart, fetchCourseDetailsSuccess, fetchCourseProgressFailed, fetchCourseProgressStart, fetchCourseProgressSuccess, fetchFeaturedCoursesFailed, fetchFeaturedCoursesStart, fetchFeaturedCoursesSuccess, fetchStudentCoursesFailed, fetchStudentCoursesStart, fetchStudentCoursesSuccess, updateCourseProgressFailed, updateCourseProgressStart, updateCourseProgressSuccess } from "./studentSlice";
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
            yield put(checkCourseAccess(true))
            yield put(fetchCourseProgressSuccess(res.data.course));
            toast.success(res.data.message);
        } else {
            yield put(checkCourseAccess(false));
            yield put(fetchCourseProgressFailed({ message: "User does not have access to course", status: 0 }));
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

export function* updateCourseProgress(action) {
    try {
        const res = yield call(sendAxiosPostJson, `student/update-course-progress/${action.payload.courseId}`, {indexes: action.payload.indexes})
        if (res && res.data.success) {
            yield put(checkCourseAccess(true))
            yield put(updateCourseProgressSuccess());
            toast.success(res.data.message);
        } else {
            yield put(checkCourseAccess(false));
            yield put(updateCourseProgressFailed({ message: "User does not have access to course", status: 0 }));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(updateCourseProgressFailed({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* fetchStudentCourses() {
    try {
        const res = yield call(sendAxiosPostJson, `student/get-student-courses`)
        if (res && res.data.success) {
            yield put(fetchStudentCoursesSuccess(res.data.courses));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(fetchStudentCoursesFailed({ message: errorMessage, status: errorStatus }));
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

export function* onUpdateCourseProgressStart() {
    yield takeLatest(updateCourseProgressStart, updateCourseProgress)
}

export function* onFetchStudentCoursesStart() {
    yield takeLatest(fetchStudentCoursesStart, fetchStudentCourses)
}

export function* studentSagas() {
    yield all([
        call(onFetchFeaturedCoursesStart),
        call(onFetchAllCoursesStart),
        call(onFetchCourseDetailsStart),
        call(onFetchCourseProgressStart),
        call(onUpdateCourseProgressStart),
        call(onFetchStudentCoursesStart),
    ])
}