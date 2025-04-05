import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'

const CourseCard = ({ course, handleNavigateToCourseDetails, myCourses = false }) => {
    let progressIndex = []
    console.log(course)
    if(myCourses){
        progressIndex = course.progressIndex
        course = course.course
    }
    return (
        <Card
            className="cursor-pointer"
            key={course?._id}
            onClick={() => handleNavigateToCourseDetails(course)}
        >
            <CardContent className="flex gap-4 p-4">
                <div className='w-48 h-32 flex-shrink-0'>
                    <img src={course?.image} className='w-full h-full object-cover' />
                </div>
                <div className='flex-1'>
                    <CardTitle className="text-xl mb-2">
                        {`${course?.title}${course?.owned ? " owned" : ""}`}
                    </CardTitle>
                    <p className='text-sm text-gray-600 mb-1'>
                        Created By{" "}
                        <span className='font-bold'>
                            {course?.instructor?.username}
                        </span>
                    </p>
                    {
                        myCourses ? (<p className='font-bold text-lg'>{`${progressIndex.length} / ${course?.lectures?.length} lectures completed`}</p>) : (
                            <div>
                                <p className='text-[16px] text-gray-600 mt-3 mb-2'>{course?.lectures?.length} lectures - {course?.level} level</p>
                                <p className='font-bold text-lg'>{course?.pricing} $</p>
                            </div>
                        )

                    }

                </div>
            </CardContent>
        </Card>
    )
}

export default CourseCard