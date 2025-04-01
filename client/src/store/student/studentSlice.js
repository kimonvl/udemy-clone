import { createSlice } from "@reduxjs/toolkit";
import { logoutSuccess } from "../auth/authSlice";

const initialState = {
    loading: false,
    error: null,
    featuredCourses: [],
    allCourses: [],
    selectedCourse: null,
    selectedCourseProgress: null,
    haveCourseAccess: false,
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        fetchFeaturedCoursesStart: (state) => {
            state.loading = true
        },
        fetchFeaturedCoursesSuccess: (state, action) => {
            state.loading = false
            state.featuredCourses = action.payload
        },
        fetchFeaturedCoursesFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        fetchAllCoursesStart: (state) => {
            state.loading = true
        },
        fetchAllCoursesSuccess: (state, action) => {
            state.loading = false
            state.allCourses = action.payload
        },
        fetchAllCoursesFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        fetchCourseDetailsStart: (state) => {
            state.loading = true
        },
        fetchCourseDetailsSuccess: (state, action) => {
            state.loading = false
            state.selectedCourse = action.payload
        },
        fetchCourseDetailsFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        fetchCourseProgressStart: (state) => {
            state.loading = true
        },
        fetchCourseProgressSuccess: (state, action) => {
            state.loading = false
            state.selectedCourseProgress = action.payload
        },
        fetchCourseProgressFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        checkCourseAccess: (state, action) => {
            state.haveCourseAccess = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logoutSuccess, () => initialState); // ✅ Reset state on logout
    }
})

const studentReducer = studentSlice.reducer
export const {
    fetchFeaturedCoursesStart,
    fetchFeaturedCoursesSuccess,
    fetchFeaturedCoursesFailed,
    fetchAllCoursesStart,
    fetchAllCoursesSuccess,
    fetchAllCoursesFailed,
    fetchCourseDetailsStart,
    fetchCourseDetailsSuccess,
    fetchCourseDetailsFailed,
    fetchCourseProgressStart,
    fetchCourseProgressSuccess,
    fetchCourseProgressFailed,
    checkCourseAccess,
} = studentSlice.actions
export default studentReducer