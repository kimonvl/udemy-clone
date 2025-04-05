import { DollarSign, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInstructorStatsStart } from '@/store/instructor/instructorSlice'
import { selectInstructorTotalRevenue, selectInstructorTotalStudents } from '@/store/instructor/instructor.selector'
import StudentDetailsDialog from './StudentDetailsDialog'

const InstuctorDashboard = () => {
    const dispatch = useDispatch()
    const totalStudents = useSelector(selectInstructorTotalStudents)
    const totalRevenue = useSelector(selectInstructorTotalRevenue)

    const [openStudentsDetailsDialog, setOpenStudentsDetailsDialog] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)

    useEffect(() => {
        dispatch(fetchInstructorStatsStart())
    }, [])

    const handleSelectStudent = (student) => {
        setSelectedStudent(student)
        setOpenStudentsDetailsDialog(true)
    }

    const config = [
        {
            icon: Users,
            label: "Total Students",
            value: totalStudents?.length
        },
        {
            icon: DollarSign,
            label: "Total Revenue",
            value: totalRevenue
        },
    ]
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                {
                    config.map((item, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {item.label}
                                </CardTitle>
                                <item.icon className='h-4 w-4 text-muted-foreground'/>
                            </CardHeader>
                            <CardContent>
                                <div className='text-2xl font-bold'>{item.value}</div>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Students List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='overflow-x-auto'>
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Total Courses</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Student Email</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    totalStudents.map((student) => (
                                        <TableRow onClick={() => handleSelectStudent(student)} key={student?._id}>
                                            <TableCell className="font-medium">{student?.courses?.length} Courses</TableCell>
                                            <TableCell>{student?.username}</TableCell>
                                            <TableCell>{student?.email}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <StudentDetailsDialog openDialog={openStudentsDetailsDialog} setOpenDialog={setOpenStudentsDetailsDialog} student={selectedStudent}/>
        </div>
    )
}

export default InstuctorDashboard