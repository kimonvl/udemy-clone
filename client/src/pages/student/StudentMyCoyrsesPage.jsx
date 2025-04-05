import CourseCard from '@/components/course-card/CourseCard'
import { selectStudentMyCourses } from '@/store/student/student.selector'
import { fetchStudentCoursesStart } from '@/store/student/studentSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const StudentMyCoyrsesPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const studentCourses = useSelector(selectStudentMyCourses)

    useEffect(() => {
        dispatch(fetchStudentCoursesStart())
    }, [])

    const handleNavigateToCourseProgress = (course) => {
        navigate(`/course-progress/${course._id}`)
    }

    return (
        <div className='container ml-3'>
            <div className="w-full flex justify-center mb-4">
                <h1 className="text-2xl font-bold">My Courses</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    studentCourses.length > 0 ? (
                        studentCourses.map((course) => (
                            <CourseCard course={course} myCourses={true} handleNavigateToCourseDetails={handleNavigateToCourseProgress} />
                        ))
                    ) : (<h1>No courses owned</h1>)
                }
            </div>
        </div>
    )
}

export default StudentMyCoyrsesPage