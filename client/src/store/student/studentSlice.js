import { createSlice } from "@reduxjs/toolkit";
import { logoutSuccess } from "../auth/authSlice";

const initialState = {
    loading: false,
    error: null,
    featuredCourses: [],
    allCourses: [],
    selectedCourse: null,
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
} = studentSlice.actions
export default studentReducer