import { createSelector } from "reselect";

const selectStudentReducer = (state) => state.student;

export const selectStudentLoading = createSelector(
    [selectStudentReducer],
    (studentrSlice) => studentrSlice.loading
)

export const selectStudentFeaturedCourses = createSelector(
    [selectStudentReducer],
    (studentrSlice) => studentrSlice.featuredCourses
)

export const selectStudentAllCourses = createSelector(
    [selectStudentReducer],
    (studentrSlice) => studentrSlice.allCourses
)

export const selectStudentSelectedCourse = createSelector(
    [selectStudentReducer],
    (studentrSlice) => studentrSlice.selectedCourse
)