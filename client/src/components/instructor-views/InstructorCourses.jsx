import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Delete, Edit } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import EditCourseDialog from './edite-course/EditCourseDialog'
import { useDispatch, useSelector } from 'react-redux'
import { selectInstructorsCourseList, selectInstructorSelectedCourse } from '@/store/instructor/instructor.selector'
import { fetchInstructorsCourseListStart, fetchSelectedInstructorCourseStart } from '@/store/instructor/instructorSlice'

const InstructorCourses = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectedCourse = useSelector(selectInstructorSelectedCourse)
    const courseList = useSelector(selectInstructorsCourseList)

    const [openEditDialog, setOpenEditDialog] = useState(false)

    useEffect(() => {
        dispatch(fetchInstructorsCourseListStart())
    }, [])

    const handleEditCourse = (courseId) => {
        if(selectedCourse?._id !== courseId){
            dispatch(fetchSelectedInstructorCourseStart(courseId))
        }
        setOpenEditDialog(true)
    }

    return (
        <>
            <Card>
                <CardHeader className="flex justify-between flex-row items-center">
                    <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
                    <Button onClick={() => navigate("/instructor/create-new-course")} className="p-6">Create New Course</Button>
                </CardHeader>
                <CardContent>
                    <div className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Revenue</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    courseList.length > 0 ? courseList.map((course, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{course?.title}</TableCell>
                                            <TableCell>{course?.students.length}</TableCell>
                                            <TableCell>{course?.students.length * course?.pricing}</TableCell>
                                            <TableCell className="text-right">
                                                {/**edit course with dialog or by navigating to a new page */}
                                                <Button onClick={() => handleEditCourse(course._id)} variant="ghost" size="sm">
                                                    <Edit className='h-6 w-6' />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Delete className='h-6 w-6' />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : null
                                }
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <EditCourseDialog openDialog={openEditDialog} setOpenDialog={setOpenEditDialog}/>
        </>
    )
}

export default InstructorCourses