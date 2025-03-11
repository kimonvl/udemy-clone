import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './auth/authSlice';
import logger from 'redux-logger';
import { rootSaga } from './root-saga';
import storage from 'redux-persist/lib/storage'; // LocalStorage as default storage
import { persistStore, persistReducer } from 'redux-persist';
import instructorReducer from './instructor/instructorSlice';
import instructorMiddleware from './instructor/instructor.middleware';
import studentReducer from './student/studentSlice';
import orderReducer from './order/orderSlice';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Persist configuration for auth slice
const persistAuthConfig = {
  key: 'auth',
  storage,  // Uses localStorage
  whitelist: ['user', "isAuthenticated"], // Persist only the 'user' state
};
const persistInstructorConfig = {
  key: 'instructor',
  storage,  // Uses localStorage
  whitelist: [
    'courseLandingForm',
    'courseCuriculumForm',
    'instructorSelectedCourse',
  ], 
};
const persistStudentConfig = {
  key: 'student',
  storage,  // Uses localStorage
  whitelist: [
    
  ], 
};
const persistOrderConfig = {
  key: 'order',
  storage,  // Uses localStorage
  whitelist: [
    "currentOrderId",
  ], 
};

// Wrap authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedInstructorReducer = persistReducer(persistInstructorConfig, instructorReducer);
const persistedStudentReducer = persistReducer(persistStudentConfig, studentReducer);
const persistedOrderReducer = persistReducer(persistOrderConfig, orderReducer);

const middlewares = [sagaMiddleware, logger, instructorMiddleware];

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    instructor: persistedInstructorReducer,
    student: persistedStudentReducer,
    order: persistedOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,  // Needed for redux-persist
    }).concat(middlewares),
});

// Persistor
export const persistor = persistStore(store);

// Run root saga
sagaMiddleware.run(rootSaga);
