import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { createNewCourseFailure, createNewCourseSuccess, deleteImageFromEditFailure, deleteImageFromEditStart, deleteImageFromEditSuccess, deleteInitialImageFailure, deleteInitialImageStart, deleteInitialImageSuccess, deleteLectureStart, deleteLectureSuccess, deleteMediaFailure, deleteMediaStart, deleteMediaSuccess, deleteTemporaryUploadedImageFailure, deleteTemporaryUploadedImageStart, deleteTemporaryUploadedImageSuccess, deleteTemprorarilyUploadedVideosFailure, deleteTemprorarilyUploadedVideosStart, deleteTemprorarilyUploadedVideosSuccess, editCourseFailure, editCourseSuccess, fetchInstructorsCourseListFailure, fetchInstructorsCourseListStart, fetchInstructorsCourseListSuccess, fetchSelectedInstructorCourseFailure, fetchSelectedInstructorCourseStart, fetchSelectedInstructorCourseSuccess, permanentlyDeleteVideosFailure, permanentlyDeleteVideosStart, permanentlyDeleteVideosSuccess, setInstructorSelectedCourse, submitEditForm, submitForm, uploadImageFromEditStart, uploadImageFromEditSuccess, uploadMediaFailure, uploadMediaStart, uploadMediaSuccess, uploadVideoFromEditFailure, uploadVideoFromEditStart, uploadVideoFromEditSuccess } from "./instructorSlice";
import { sendAxiosPostFormData, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";

export function* createNewCourse(action) {
    try {
        const res = yield call(sendAxiosPostJson, "instructor/create-new-course", action.payload.form)
        if (res && res.data.success) {
            yield put(createNewCourseSuccess());
            toast.success(res.data.message);
            action.payload.navigate("/instructor")
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(createNewCourseFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* editCourse(action) {
    try {
        const res = yield call(sendAxiosPostJson, `instructor/edit-course/${action.payload.form._id}`, action.payload.form)
        if (res && res.data.success) {
            yield put(editCourseSuccess())
            yield put(permanentlyDeleteVideosStart())
            yield put(deleteInitialImageStart())
            yield put(setInstructorSelectedCourse(null))
            toast.success(res.data.message)
            action.payload.setOpen(false)
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(editCourseFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* uploadMedia(action) {
    try {
        const res = yield call(sendAxiosPostFormData, "instructor/upload-media", action.payload.formData)
        if (res && res.data.success) {
            yield put(uploadMediaSuccess({
                secure_url: res.data.secure_url,
                public_id: res.data.public_id,
                type: action.payload.type,
            }));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(uploadMediaFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* deleteMedia(action) {
    try {
        const res = yield call(sendAxiosPostJson, "instructor/delete-media", { mediaPublicId: action.payload.public_id, resourceType: action.payload.type })
        if (res && res.data.success) {
            yield put(deleteMediaSuccess(action.payload));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(deleteMediaFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* deleteLecture(action) {
    try {
        console.log("saga lecture index ", action.payload.lectureIndex);

        if (action.payload.videoPublicId) {
            const res = yield call(sendAxiosPostJson, "instructor/delete-media", { mediaPublicId: action.payload.videoPublicId })
            if (res && res.data.success) {
                yield put(deleteLectureSuccess({ lectureIndex: action.payload.lectureIndex }));
                toast.success(res.data.message);
            }
        } else {
            yield put(deleteLectureSuccess({ lectureIndex: action.payload.lectureIndex }));
            toast.success("Lecture without video deleted");
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(deleteMediaFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* uploadVideoFromEdit(action) {
    try {
        const res = yield call(sendAxiosPostFormData, "instructor/upload-media", action.payload.formData)
        if (res && res.data.success) {
            yield put(uploadVideoFromEditSuccess({
                secure_url: res.data.secure_url,
                public_id: res.data.public_id,
                lectureIndex: action.payload.index,
            }));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(uploadVideoFromEditFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* uploadImageFromEdit(action) {
    try {
        const res = yield call(sendAxiosPostFormData, "instructor/upload-media", action.payload.formData)
        if (res && res.data.success) {
            yield put(uploadImageFromEditSuccess({
                secure_url: res.data.secure_url,
                public_id: res.data.public_id
            }));
            toast.success(res.data.message);
        }

    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(deleteImageFromEditFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* deleteImageFromEdit(action) {
    try {
        const initialImage = yield select(state => state.instructor.initialImage)
        if (action.payload === initialImage) {
            yield put(deleteImageFromEditSuccess())
        } else {
            const res = yield call(sendAxiosPostJson, "instructor/delete-media", { mediaPublicId: action.payload, resourceType: "image" })
            if (res && res.data.success) {
                yield put(deleteImageFromEditSuccess());
                toast.success(res.data.message);
            }
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(deleteImageFromEditFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* deleteTemporaryImage() {
    try {
        const initialImage = yield select(state => state.instructor.initialImage)
        const lecture = yield select(state => state.instructor.instructorSelectedCourse)
        console.log("selected course ", lecture);
        
        const currentImage = lecture.imagePublicId
        if (initialImage !== currentImage) {
            const res = yield call(sendAxiosPostJson, "instructor/delete-media", { mediaPublicId: currentImage, resourceType: "image" })
            if (res && res.data.success) {
                yield put(deleteTemporaryUploadedImageSuccess());
                toast.success(res.data.message);
            }
        }
        yield put(setInstructorSelectedCourse(null))
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(deleteTemporaryUploadedImageFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* deleteInitialImage() {
    try {
        const initialImage = yield select(state => state.instructor.initialImage)
        const lecture = yield select(state => state.instructor.instructorSelectedCourse)
        console.log("selected course ", lecture);
        
        const currentImage = lecture.imagePublicId
        if (initialImage !== currentImage) {
            const res = yield call(sendAxiosPostJson, "instructor/delete-media", { mediaPublicId: initialImage, resourceType: "image" })
            if (res && res.data.success) {
                yield put(deleteInitialImageSuccess());
                toast.success(res.data.message);
            }
        }
        yield put(setInstructorSelectedCourse(null))
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(deleteInitialImageFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* masDeleteVideos(action) {
    let type = null
    try {
        let videos = null
        if (action.type === "instructor/deleteTemprorarilyUploadedVideosStart") {
            videos = yield select(state => state.instructor.temporaryUploadedVideos)
            type = "uploaded"
        } else if (action.type === "instructor/permanentlyDeleteVideosStart") {
            videos = yield select(state => state.instructor.temporaryDeletedVideos)
            type = "deleted"
        }
        if(videos.length > 0){
            videos = JSON.stringify(videos)
            const res = yield call(sendAxiosPostJson, "instructor/mas-delete-videos", { videos: videos })
            if (res && res.data.success) {
                if (type === "uploaded") {
                    yield put(deleteTemprorarilyUploadedVideosSuccess())
                } else if (type === "deleted") {
                    yield put(permanentlyDeleteVideosSuccess())
                }
                toast.success(res.data.message);
            }
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;
        if (type === "uploaded") {
            yield put(deleteTemprorarilyUploadedVideosFailure({ message: errorMessage, status: errorStatus }))
        } else if (type === "deleted") {
            yield put(permanentlyDeleteVideosFailure({ message: errorMessage, status: errorStatus }))
        }
        toast.error(errorMessage);
    }
}

export function* fetchInstructorsCourseList() {
    try {
        const res = yield call(sendAxiosPostJson, "instructor/get-instructor-course-list")
        if (res && res.data.success) {
            yield put(fetchInstructorsCourseListSuccess(res.data.courses));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(fetchInstructorsCourseListFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* fetchSelectedInstructorCourse(action) {
    try {
        const res = yield call(sendAxiosPostJson, `instructor/get-instructor-course/${action.payload}`)
        if (res && res.data.success) {
            yield put(fetchSelectedInstructorCourseSuccess(res.data.course));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(fetchSelectedInstructorCourseFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onSubmitForm() {
    yield takeLatest(submitForm, createNewCourse);
}

export function* onUploadMediaStart() {
    yield takeLatest(uploadMediaStart, uploadMedia);
}

export function* onDeleteMediaStart() {
    yield takeLatest(deleteMediaStart, deleteMedia);
}

export function* onDeleteLectureStart() {
    yield takeLatest(deleteLectureStart, deleteLecture);
}

export function* onSubmitEditForm() {
    yield takeLatest(submitEditForm, editCourse);
}

export function* onUploadVideoFromEditStart() {
    yield takeLatest(uploadVideoFromEditStart, uploadVideoFromEdit);
}

export function* onUploadImageFromEditStart() {
    yield takeLatest(uploadImageFromEditStart, uploadImageFromEdit);
}

export function* onDeleteImageFromEditStart() {
    yield takeLatest(deleteImageFromEditStart, deleteImageFromEdit);
}

export function* onPermanentlyDeleteVideosStart() {
    yield takeLatest(permanentlyDeleteVideosStart, masDeleteVideos);
}

export function* onDeleteTemporaryUploadedImageStart() {
    yield takeLatest(deleteTemporaryUploadedImageStart, deleteTemporaryImage);
}

export function* onDeleteInitialImageStart() {
    yield takeLatest(deleteInitialImageStart, deleteInitialImage);
}

export function* onDeleteTemprorarilyUploadedVideosStart() {
    yield takeLatest(deleteTemprorarilyUploadedVideosStart, masDeleteVideos);
}

export function* onFetchInstructorsCourseListStart() {
    yield takeLatest(fetchInstructorsCourseListStart, fetchInstructorsCourseList);
}

export function* onFetchSelectedInstructorCourseStart() {
    yield takeLatest(fetchSelectedInstructorCourseStart, fetchSelectedInstructorCourse);
}

export function* instructorSagas() {
    yield all([
        call(onSubmitForm),
        call(onUploadMediaStart),
        call(onDeleteMediaStart),
        call(onDeleteLectureStart),
        call(onSubmitEditForm),
        call(onUploadVideoFromEditStart),
        call(onUploadImageFromEditStart),
        call(onDeleteImageFromEditStart),
        call(onDeleteTemporaryUploadedImageStart),
        call(onDeleteInitialImageStart),
        call(onPermanentlyDeleteVideosStart),
        call(onDeleteTemprorarilyUploadedVideosStart),
        call(onFetchInstructorsCourseListStart),
        call(onFetchSelectedInstructorCourseStart),
    ])
}
