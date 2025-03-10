import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config/config'
import { createSlice } from '@reduxjs/toolkit'
import { logoutSuccess } from '../auth/authSlice'

const initialState = {
    loading: false,
    uploadedMediaDetails: {
        secure_url: "",
        public_id: "",
        type: "",
    },
    courseLandingForm: courseLandingInitialFormData,
    courseCuriculumForm: courseCurriculumInitialFormData,
    instructorsCourseList: [],
    instructorSelectedCourse: null,
    temporaryDeletedVideos: [], //video public id's that are deleted but submit is not pressed yet (need to be deleted if edit proccedure is completed successfully)
    temporaryUploadedVideos: [], //video public id's that are uploaded but submit is not pressed yet (need to be deleted if edit proccedure is canceled in any way)
    initialImage: "",
    error: null
}

export const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        createNewCourseStart: (state) => {
            state.loading = true
        },
        submitForm: () => {

        },
        createNewCourseSuccess: (state) => {
            state.loading = false
            state.courseLandingForm = courseLandingInitialFormData
            state.courseCuriculumForm = courseCurriculumInitialFormData
            localStorage.setItem('courseLandingForm', JSON.stringify(courseLandingInitialFormData))
            localStorage.setItem('courseCuriculumForm', JSON.stringify(courseCurriculumInitialFormData))
        },
        createNewCourseFailure: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
        uploadMediaStart: (state) => {
            state.loading = true
            state.uploadedMediaDetails = initialState.uploadedMediaDetails
            // update the form  in the reducer like delete and triger a selector to update the local state
        },
        uploadMediaSuccess: (state, action) => {
            state.loading = false
            state.uploadedMediaDetails = action.payload
            if (action.payload.type === "image") {
                state.courseLandingForm = {
                    ...state.courseLandingForm,
                    image: action.payload.secure_url,
                    imagePublicId: action.payload.public_id,

                }
            }
        },
        uploadMediaFailure: (state, action) => {
            state.loading = false
            state.uploadedMediaDetails = initialState.uploadedMediaDetails
            state.error = action.payload
        },
        deleteMediaStart: (state) => {
            state.loading = true
        },
        deleteMediaSuccess: (state, action) => {
            state.loading = false
            if (action.payload.type === "video") {
                state.courseCuriculumForm = state.courseCuriculumForm.map((lecture) => {
                    if (lecture.videoPublicId == action.payload.public_id) {
                        console.log("removing video from lecture");

                        return {
                            ...lecture,
                            video: "",
                            videoPublicId: ""
                        }
                    } else {
                        return lecture
                    }
                })
            } else if (action.payload.type === "image") {
                state.courseLandingForm = {
                    ...state.courseLandingForm,
                    image: "",
                    imagePublicId: "",
                }
            }

        },
        deleteMediaFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteLectureStart: (state) => {
            state.loading = true
        },
        deleteLectureSuccess: (state, action) => {
            state.loading = false
            state.courseCuriculumForm = state.courseCuriculumForm.filter((lecture) => {
                return Number(lecture.lectureIndex) !== Number(action.payload.lectureIndex)
            })
        },
        deleteLectureFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        editCourseStart: (state) => {
            state.loading = true
        },
        submitEditForm: () => {

        },
        editCourseSuccess: (state) => {
            state.loading = false
        },
        editCourseFailure: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
        uploadVideoFromEditStart: (state) => {
            state.loading = true
        },
        uploadVideoFromEditSuccess: (state, action) => {
            state.loading = false
            state.instructorSelectedCourse.lectures = state.instructorSelectedCourse.lectures.map((lecture) => {
                if (Number(lecture.lectureIndex) === Number(action.payload.lectureIndex)) {
                    state.temporaryUploadedVideos.push(action.payload.public_id)
                    return {
                        ...lecture,
                        video: action.payload.secure_url,
                        videoPublicId: action.payload.public_id
                    }
                } else {
                    return lecture
                }
            })
        },
        uploadVideoFromEditFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        temporaryDeleteVideoFromEdit: (state, action) => {
            state.instructorSelectedCourse.lectures = state.instructorSelectedCourse.lectures.map((lecture) => {
                if (lecture.videoPublicId == action.payload.public_id) {
                    console.log("removing video from edit lecture");
                    state.temporaryDeletedVideos.push(lecture.videoPublicId)
                    return {
                        ...lecture,
                        video: "",
                        videoPublicId: ""
                    }
                } else {
                    return lecture
                }
            })
        },
        deleteLectureFromEdit: (state, action) => {
            state.instructorSelectedCourse.lectures = state.instructorSelectedCourse.lectures.filter((lecture) => {
                return Number(lecture.lectureIndex) !== Number(action.payload.lectureIndex)
            })
            if (action.payload.videoPublicId) {
                state.temporaryDeletedVideos.push(action.payload.videoPublicId)
            }
        },
        permanentlyDeleteVideosStart: (state) => {
            state.loading = true
        },
        permanentlyDeleteVideosSuccess: (state) => {
            state.loading = false
            state.temporaryDeletedVideos = []
        },
        permanentlyDeleteVideosFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteTemprorarilyUploadedVideosStart: (state) => {
            state.loading = true
        },
        deleteTemprorarilyUploadedVideosSuccess: (state) => {
            state.loading = false
            state.temporaryUploadedVideos = []
        },
        deleteTemprorarilyUploadedVideosFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        uploadImageFromEditStart: (state) => {
            state.loading = true
        },
        uploadImageFromEditSuccess: (state, action) => {
            state.loading = false
            state.instructorSelectedCourse.image = action.payload.secure_url
            state.instructorSelectedCourse.imagePublicId = action.payload.public_id
        },
        uploadImageFromEditFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteImageFromEditStart: (state) => {
            state.loading = true
        },
        deleteImageFromEditSuccess: (state) => {
            state.loading = false
            state.instructorSelectedCourse.image = ""
            state.instructorSelectedCourse.imagePublicId = ""
        },
        deleteImageFromEditFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteTemporaryUploadedImageStart: (state) => {
            state.loading = true
        },
        deleteTemporaryUploadedImageSuccess: (state) => {
            state.loading = false
        },
        deleteTemporaryUploadedImageFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteInitialImageStart: (state) => {
            state.loading = true
        },
        deleteInitialImageSuccess: (state) => {
            state.loading = false
        },
        deleteInitialImageFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        setInstructorSelectedCourse: (state, action) => {
            state.instructorSelectedCourse = action.payload
        },
        setCourseLandingForm: (state, action) => {
            state.courseLandingForm = action.payload
        },
        setCourseCuriculumForm: (state, action) => {
            state.courseCuriculumForm = action.payload
        },
        fetchInstructorsCourseListStart: (state) => {
            state.loading = true
        },
        fetchInstructorsCourseListSuccess: (state, action) => {
            state.loading = false
            state.instructorsCourseList = action.payload
        },
        fetchInstructorsCourseListFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        fetchSelectedInstructorCourseStart: (state) => {
            state.loading = true
        },
        fetchSelectedInstructorCourseSuccess: (state, action) => {
            state.loading = false
            state.instructorSelectedCourse = action.payload
            state.initialImage = action.payload.imagePublicId
        },
        fetchSelectedInstructorCourseFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logoutSuccess, () => initialState); // ✅ Reset state on logout
    }
})

const instructorReducer = instructorSlice.reducer
export const {
    createNewCourseStart,
    submitForm,
    createNewCourseSuccess,
    createNewCourseFailure,
    uploadMediaStart,
    uploadMediaSuccess,
    uploadMediaFailure,
    deleteMediaStart,
    deleteMediaSuccess,
    deleteMediaFailure,
    deleteLectureStart,
    deleteLectureSuccess,
    deleteLectureFailure,
    editCourseStart,
    submitEditForm,
    editCourseSuccess,
    editCourseFailure,
    uploadVideoFromEditStart,
    uploadVideoFromEditSuccess,
    uploadVideoFromEditFailure,
    temporaryDeleteVideoFromEdit,
    deleteLectureFromEdit,
    permanentlyDeleteVideosStart,
    permanentlyDeleteVideosSuccess,
    permanentlyDeleteVideosFailure,
    deleteTemprorarilyUploadedVideosStart,
    deleteTemprorarilyUploadedVideosSuccess,
    deleteTemprorarilyUploadedVideosFailure,
    uploadImageFromEditStart,
    uploadImageFromEditSuccess,
    uploadImageFromEditFailure,
    deleteImageFromEditStart,
    deleteImageFromEditSuccess,
    deleteImageFromEditFailure,
    deleteTemporaryUploadedImageStart,
    deleteTemporaryUploadedImageSuccess,
    deleteTemporaryUploadedImageFailure,
    deleteInitialImageStart,
    deleteInitialImageSuccess,
    deleteInitialImageFailure,
    setInstructorSelectedCourse,
    setCourseLandingForm,
    setCourseCuriculumForm,
    fetchInstructorsCourseListStart,
    fetchInstructorsCourseListSuccess,
    fetchInstructorsCourseListFailure,
    fetchSelectedInstructorCourseStart,
    fetchSelectedInstructorCourseSuccess,
    fetchSelectedInstructorCourseFailure,
} = instructorSlice.actions
export default instructorReducer;// ✅ Ensure you're exporting the reducer as default
