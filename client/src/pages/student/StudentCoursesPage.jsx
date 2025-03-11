import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { filterOptions, sortOptions } from '@/config/config'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchAllCoursesStart, fetchCourseDetailsStart } from '@/store/student/studentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectStudentAllCourses } from '@/store/student/student.selector'

const StudentCoursesPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allCourses = useSelector(selectStudentAllCourses)
    const [filters, setFilters] = useState({
        category: [],
        level: [],
        primaryLanguage: [],
    })

    useEffect(() => {
        console.log("filters to fetch", filters)
        dispatch(fetchAllCoursesStart(filters))
    }, [filters])

    useEffect(() => {
        const storedFilters = JSON.parse(sessionStorage.getItem("filters"))
        if (storedFilters && "category" in storedFilters && "level" in storedFilters && "primaryLanguage" in storedFilters) {
            setFilters(storedFilters)
        }
    }, [])

    const location = useLocation();

    useEffect(() => {
        const handleNavigation = () => {
            setFilters({
                category: [],
                level: [],
                primaryLanguage: [],
            })
            sessionStorage.setItem("filters", JSON.stringify({
                category: [],
                level: [],
                primaryLanguage: [],
            }))
        };

        return () => {
            if (location.pathname !== window.location.pathname) {
                handleNavigation();
            }
        };
    }, [location]);

    const handleCheckboxValueChange = (value, keyItem, checked) => {
        if (!checked) {
            //remove from filters
            let cpyFilters = { ...filters }
            cpyFilters[keyItem] = cpyFilters[keyItem].filter((item) => item !== value)
            setFilters(cpyFilters)
            sessionStorage.setItem("filters", JSON.stringify(cpyFilters))
        } else {
            //add to filters
            let cpyFilters = { ...filters }
            cpyFilters[keyItem].push(value)
            setFilters(cpyFilters)
            sessionStorage.setItem("filters", JSON.stringify(cpyFilters))
        }
    }

    const handleNavigateToCourseDetails = (courseId) => {
        dispatch(fetchCourseDetailsStart(courseId))
        navigate('/course-details')
    }

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-4'>All Courses</h1>
            <div className='flex flex-col md:flex-row gap-4'>
                <aside className='w-full md:w-64 space-y-4'>
                    <div>
                        {
                            Object.keys(filterOptions).map((keyItem, index) => (
                                <div key={index} className='p-4 border-b'>
                                    <h3 className='font-bold mb-3'>{keyItem.toUpperCase()}</h3>
                                    <div className='grid gap-2 mt-2'>
                                        {
                                            filterOptions[keyItem].map((option) => (
                                                <Label key={option.value} className="flex font-medium items-center gap-3">
                                                    <Checkbox
                                                        onCheckedChange={(checked) => handleCheckboxValueChange(option.id, keyItem, checked)}
                                                        checked={filters[keyItem]?.includes(option.id)}
                                                    />
                                                    {option.label}
                                                </Label>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </aside>
                <main className='flex-1'>
                    <div className='flex justify-end items-center mb-4 gap-5'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-2 p-5">
                                    <ArrowUpDownIcon className='h-4 w-4' />
                                    <span className='text-[16px] font-medium'>Sort By</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px]">
                                <DropdownMenuRadioGroup value='' onValueChange={(value) => null}>
                                    {
                                        sortOptions.map((sortItem) => (
                                            <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                                {sortItem.label}
                                            </DropdownMenuRadioItem>
                                        ))
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <span className='text-sm text-black font-bold'>
                            15 result
                        </span>
                    </div>
                    <div className='space-y-4'>
                        {
                            allCourses.map((course) => (
                                <Card
                                    className="cursor-pointer"
                                    key={course?._id}
                                    onClick={() => handleNavigateToCourseDetails(course?._id)}
                                >
                                    <CardContent className="flex gap-4 p-4">
                                        <div className='w-48 h-32 flex-shrink-0'>
                                            <img src={course?.image} className='w-full h-full object-cover' />
                                        </div>
                                        <div className='flex-1'>
                                            <CardTitle className="text-xl mb-2">
                                                {course?.title}
                                            </CardTitle>
                                            <p className='text-sm text-gray-600 mb-1'>
                                                Created By{" "}
                                                <span className='font-bold'>
                                                    {course?.instructor?.username}
                                                </span>
                                            </p>
                                            <p className='text-[16px] text-gray-600 mt-3 mb-2'>{course?.lectures?.length} lectures - {course?.level} level</p>
                                            <p className='font-bold text-lg'>{course?.pricing} $</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default StudentCoursesPage