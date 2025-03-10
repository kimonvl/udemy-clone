import { all, call } from "redux-saga/effects";
import { authSagas } from "./auth/auth.saga";
import { instructorSagas } from "./instructor/instructor.saga";
import { studentSagas } from "./student/student.saga";

export function* rootSaga() {
    yield all([
        call(authSagas), 
        call(instructorSagas),
        call(studentSagas),
    ]);
}