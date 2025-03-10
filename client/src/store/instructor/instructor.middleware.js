import { toast } from "sonner";
import { submitEditForm, submitForm } from "./instructorSlice";

const instructorMiddleware = (store) => (next) => (action) => {


    if (action.type === 'instructor/createNewCourseStart') {
        const state = store.getState().instructor;
        const { courseLandingForm, courseCuriculumForm } = state;

        if (!validateForm(courseLandingForm) || !validateForm(courseCuriculumForm)) {
            return
        }

        const finalForm = {
            ...courseLandingForm,
            lectures: JSON.stringify(courseCuriculumForm),
        }
        console.log("middleware final form ", finalForm);
        store.dispatch(submitForm({ form: finalForm, navigate: action.payload }));
        return next(action)
    } else if (action.type === 'instructor/editCourseStart') {
        const state = store.getState().instructor;
        const { instructorSelectedCourse } = state;
        // Extract course details and lectures
        const courseLandingForm = { ...instructorSelectedCourse };
        const courseCuriculumForm = instructorSelectedCourse.lectures; // Extract lectures

        // Remove `lectures` from `courseLandingForm` before validation
        delete courseLandingForm.lectures;
        //propare validation for curiculum array
        if (!validateForm(courseLandingForm) || !validateForm(courseCuriculumForm)) {
            return
        }

        const finalForm = {
            ...instructorSelectedCourse,
            lectures: JSON.stringify(instructorSelectedCourse.lectures),
        }
        store.dispatch(submitEditForm({ form: finalForm, setOpen: action.payload }));
        return next(action)
    }

    return next(action)
};

const validateForm = (form) => {
    for (const [key, value] of Object.entries(form)) {
        if (value === "") {
            toast.error(`Field missing: ${key}`)
            return false
        }
    }
    return true
}

export default instructorMiddleware;