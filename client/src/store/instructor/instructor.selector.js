import { createSelector } from "reselect";

const selectInstructorReducer = (state) => state.instructor;

export const selectInstructorLoading = createSelector(
    [selectInstructorReducer],
    (instructorSlice) => instructorSlice.loading
);

export const selectInstructorUploadedMediaDetails = createSelector(
    [selectInstructorReducer],
    (instructorSlice) => instructorSlice.uploadedMediaDetails
);

export const selectCourseLandingForm = createSelector(
    [selectInstructorReducer],
    (instructorSlice) => instructorSlice.courseLandingForm
    
);

export const selectCourseCuriculumForm = createSelector(
    [selectInstructorReducer],
    (instructorSlice) => instructorSlice.courseCuriculumForm
);

export const selectInstructorsCourseList= createSelector(
    [selectInstructorReducer],
    (instructorSlice) => instructorSlice.instructorsCourseList
);

export const selectInstructorSelectedCourse= createSelector(
    [selectInstructorReducer],
    (instructorSlice) => instructorSlice.instructorSelectedCourse
);
