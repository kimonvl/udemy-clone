import { Route, Routes } from 'react-router-dom'
import './App.css'
import React, { useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import InstructorDashboardPage from './pages/instructor/InstructorDashboardPage'
import StudentViewCommonLayout from './components/student-views/StudentViewCommonLayout'
import StudentHomePage from './pages/student/StudentHomePage'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, selectIsAuthenticated, selectLoading } from './store/auth/auth.selector'
import { checkAuthenticatedStart } from './store/auth/authSlice'
import CreateNewCoursePage from './pages/instructor/CreateNewCoursePage'
import StudentCoursesPage from './pages/student/StudentCoursesPage'
import StudentCourseDetailsPage from './pages/student/StudentCourseDetailsPage'

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  console.log("loading", loading)

  useEffect(() => {
    dispatch(checkAuthenticatedStart());
  }, [])

  return (
    <Routes>
      <Route
        path='/auth'
        element={
          <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated} user={currentUser} element={<AuthPage />}/>
        }
      />
      <Route
        path='/instructor'
        element={
          <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated} user={currentUser} element={<InstructorDashboardPage />} />
        }
      />
      <Route
        path='/instructor/create-new-course'
        element={
          <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated} user={currentUser} element={<CreateNewCoursePage />} />
        }
      />
      <Route
        path='/'
        element={
          <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated} user={currentUser} element={<StudentViewCommonLayout />}/>
        }
      >
        <Route
          path='/'
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated} user={currentUser} element={<StudentHomePage />}/>
          }
        />
        <Route
          path='/home'
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated} user={currentUser} element={<StudentHomePage />}/>
          }
        />
        <Route
          path='/courses'
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated} user={currentUser} element={<StudentCoursesPage />}/>
          }
        />
        <Route
          path='/course-details'
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated} user={currentUser} element={<StudentCourseDetailsPage />}/>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
